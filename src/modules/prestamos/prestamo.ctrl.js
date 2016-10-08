(function (ng) {
    var mod = ng.module('prestamosModule');

    mod.controller('prestamosCtrl', ['prestamosService', 'usuariosService', 'puntosPrestamoService', 'bicisService', 'confirmacionService', '$modal',
                                    function (svc, usuariosSvc, puntosPrestamoSvc, bicisSvc, confirmacion, $modal) {    	
    	
        this.nuevoPrestamo = function() {
            this.abrirItem(
                {
                    usuario: "", 
                    bicicleta: "", 
                    fecha: "",
                    usuarioAutorizado: "", 
                    punto: "", 
                    retorno: ""
                }, this.usuarios, this.puntosPrestamo);
        }

        this.abrirItem = function(reserva, usuarios, puntosPrestamo) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/prestamos/item/prestamoItem.tpl.html',
                controller: 'prestamoItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        prestamo: function() {
                            return { 
                                usuario: reserva.user, 
                                bicicleta: reserva.bicicleta, 
                                fecha: "",
                                usuarioAutorizado: reserva.user, 
                                punto: reserva.punto, 
                                retorno: reserva.retorno
                            };
                        },
                        usuarios: function() {
                            return usuarios;
                        },
                        puntosPrestamo: function() {
                            return puntosPrestamo;
                        }
                }
            });

            modalInstance.result.then(function(infoPrestamo) {
                infoPrestamo.fecha = new Date();
                if(!!reserva.id) {
                    svc.crearPrestamo(infoPrestamo)
                        .success(function(data) {
                            svc.asociarPrestamoAReserva(data.id, reserva).then(function(data) {
                                bicisSvc.quitarPuntoPrestamoBici(data.bicicleta).then(function(data) {
                                    confirmacion.showModal({}, this.confirmarPrestamo)
                                        .then(function (result) {
                                            this.refrescarReservas();
                                        }.bind(this));
                                }.bind(this))
                            }.bind(this));
                        }.bind(this))
                        .error(function(error) {
                            confirmacion.showModal({}, this.noPrestamo)
                                .then(function (result) {
                                    this.refrescarReservas();
                                }.bind(this));
                        }.bind(this));
                } else {
                    svc.crearPrestamo(infoPrestamo)
                    .success(function(data) {
                        bicisSvc.quitarPuntoPrestamoBici(data.bicicleta).then(function(data) {
                            confirmacion.showModal({}, this.confirmarPrestamo)
                                .then(function (result) {
                                    this.refrescarReservas();
                                }.bind(this));
                        }.bind(this))
                    }.bind(this))
                    .error(function(error) {
                            confirmacion.showModal({}, this.noPrestamo)
                                .then(function (result) {
                                    this.refrescarReservas();
                                }.bind(this));
                    }.bind(this));
                }
            }.bind(this));
        };

        this.refrescarReservas = function() {
            svc.getReservasParaPrestamo().then(function(data) {
                this.reservas = data;
            }.bind(this));
        };

        this.refrescarPuntosPrestamo = function() {
            puntosPrestamoSvc.getPuntosPrestamo().then(function(data) {
                for (var i = 0 ; i < data.length ; i++) {
                    this.puntosPrestamo[data[i].id] = data[i];
                }
            }.bind(this));
        };

        this.refrescarUsuarios = function() {
            usuariosSvc.getUsuarios().then(function(data) {
                for (var i = 0 ; i < data.length ; i++) {
                    if(!data[i].is_superuser && !data[i].groups.length) {
                        this.usuarios[data[i].id] = data[i];
                    }
                }
            }.bind(this));
        };

        this.reservas = [];
        this.puntosPrestamo = {};
        this.usuarios = {};
        this.confirmarPrestamo = {
            closeButtonText: '',
            actionButtonText: 'OK',
            headerText: 'Préstamo creado',
            bodyText: 'Se ha registrado el préstamo éxitosamente.'
        };
        this.noPrestamo = {
            closeButtonText: '',
            actionButtonText: 'OK',
            headerText: 'Préstamo no éxitoso',
            bodyText: 'La bicicleta se encuentra reservada.'
        };
        this.refrescarReservas();
        this.refrescarPuntosPrestamo();
        this.refrescarUsuarios();
   }]);
})(window.angular);


