(function (ng) {
    var mod = ng.module('solicitudMantenimientoModule');

    mod.controller('solicitudMantenimientoCtrl', ['solicitudMantenimientoService', '$modal', 'cookiesService', 'confirmacionService',
                                    function (svc, $modal, cookiesSvc, confirmacion) {    	
    	
        this.nuevoTipoBici = function() {
            this.abrirItem({descripcion: "", deshabilitar: true});
        }

        this.abrirItem = function(solicitud) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/solicitudMantenimiento/item/solicitudMantenimientoItem.tpl.html',
                controller: 'solicitudMantenimientoItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        solicitud: function() {
                            return {
                                id: solicitud.id, 
                                descripcion: solicitud.nombre, 
                                mantenimiento: solicitud.mantenimiento,
                                bicicleta: solicitud.bicicleta
                            };
                        }
                }   
            });

            modalInstance.result.then(function(infoSolicitud) {
                svc.nuevaSolicitud(infoSolicitud).then(
                    function(data) {
                        confirmacion.showModal({}, this.confirmarSolicitud)
                            .then(function(result) {
                                this.refrescarSolicitudes();
                            }.bind(this));
                    }.bind(this));
            }.bind(this));
        };

    	this.refrescarSolicitudes = function() {
    		svc.getSolicitudes().then(function(data) {
    			this.solicitudes = data;
    		}.bind(this));
    	};

        this.enMantenimiento = function(mantenimiento) {
            if(mantenimiento) {
                return "Se pidió mantenimiento";
            } else {
                return "No se pidió mantenimiento";
            }
        }

        this.solicitudes = [];
        this.confirmarSolicitud = {
            closeButtonText: '',
            actionButtonText: 'OK',
            headerText: 'Solicitud creada',
            bodyText: 'Se ha registrado la solicitud éxitosamente.'
        };
    	this.refrescarSolicitudes();
   }]);
})(window.angular);


