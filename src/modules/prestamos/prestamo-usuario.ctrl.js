(function (ng) {
    var mod = ng.module('prestamosModule');

    mod.controller('prestamosUsuarioCtrl', ['prestamosService', 'usuariosService', 'puntosPrestamoService', 'cookiesService','$modal',
                                    function (svc, usuariosSvc, puntosPrestamoSvc, cookiesSvc, $modal) {    	
    	

        this.abrirItem = function(prestamo, usuarios, puntosPrestamo) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/prestamos/item/prestamoUsuarioItem.tpl.html',
                controller: 'prestamoUsuarioItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        prestamo: function() {
                            return { 
                                id: prestamo.id,
                                usuario: prestamo.usuario, 
                                bicicleta: prestamo.bicicleta, 
                                fecha: prestamo.fecha,
                                usuarioAutorizado: prestamo.usuarioAutorizado, 
                                punto: prestamo.punto, 
                                retorno: prestamo.retorno
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
                svc.actualizarPrestamo(infoPrestamo).then(
                    function(data) {
                        this.refrescarPrestamos();
                    }.bind(this));
            }.bind(this));
        };

        this.refrescarPrestamos = function() {
            svc.getPrestamosUsuario(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.prestamos = data;
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

        this.prestamos = [];
        this.puntosPrestamo = {};
        this.usuarios = {};
        this.refrescarPrestamos();
        this.refrescarPuntosPrestamo();
        this.refrescarUsuarios();
   }]);
})(window.angular);


