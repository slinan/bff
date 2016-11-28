(function (ng) {
    var mod = ng.module('retornosModule');

    mod.controller('retornosCtrl', ['retornosService', 'usuariosService', 'puntosPrestamoService', 'bicisService', 'multasService', 'confirmacionService', 'registroPuntosService', '$modal',
                                    function (svc, usuariosSvc, puntosPrestamoSvc, bicisSvc, multasSvc, confirmacion, puntosSvc, $modal) {    	
    	
        this.abrirItem = function(prestamo, usuarios, puntosPrestamo, tiposMultas, tiposPuntos) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/retornos/item/retornoItem.tpl.html',
                controller: 'retornoItemCtrl',
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
                        },
                        tiposMultas: function() {
                            return tiposMultas;
                        },
                        tiposPuntos: function() {
                            return tiposPuntos;
                        }
                }
            });

            modalInstance.result.then(function(infoRetorno) {
                var ret = {
                    punto: infoRetorno.punto,
                    prestamo: infoRetorno.prestamo, 
                    tiposInfraccion: []
                }
                for (var key in tiposMultas) {
                    if (!!tiposMultas[key].selected){
                        ret.tiposInfraccion.push({tipoId: tiposMultas[key].id})
                    }
                } 
                          
                ret.pazYSalvo = ret.tiposInfraccion.length == 0;     
                svc.crearRetorno(ret).then(function(data) {
                    bicisSvc.asignarPuntoPrestamoBici(infoRetorno.bicicleta, infoRetorno.punto).then(function(data) {
                        puntosSvc.nuevoRegistroPuntos(infoRetorno.usuario, {razon: "Retorno exitoso", puntos: 0.5}).then(function(data){
                            var promesas = []
                            for (var key in tiposPuntos) {
                                if (!!tiposPuntos[key].selected){
                                    var promesa = puntosSvc.nuevoRegistroPuntos(infoRetorno.usuario, tiposPuntos[key]);
                                    promesas.push[promesa];
                                }
                            } 
                            Promise.all(promesas).then(function(data) { 
                                console.log("todas bien");
                                confirmacion.showModal({}, this.confirmarRetorno).then(function (result) {
                                    this.refrescarPrestamos();
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        };

        this.refrescarPrestamos = function() {
            svc.getPrestamosSinRetorno().then(function(data) {
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

        this.refrescarTiposMultas = function() {
            multasSvc.getMultas().then(function(data) {
                this.tiposMultas = data;
            }.bind(this));
        };

        this.prestamos = [];
        this.puntosPrestamo = {};
        this.usuarios = {};
        this.tiposMultas = [];
        this.tiposPuntos = [{razon: "Vandalismo sobre la bicicleta", puntos: -300}, 
                            {razon: "Daños visibles en la bicicleta", puntos: -100},
                            {razon: "Incidente de tránsito", puntos: -200}
                            ];
        this.confirmarRetorno = {
            closeButtonText: '',
            actionButtonText: 'OK',
            headerText: 'Retorno creado',
            bodyText: 'Se ha registrado el retorno éxitosamente.'
        };

        this.refrescarPrestamos();
        this.refrescarPuntosPrestamo();
        this.refrescarUsuarios();
        this.refrescarTiposMultas();
   }]);
})(window.angular);


