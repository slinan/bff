(function (ng) {
    var mod = ng.module('solicitudMantenimientoModule');

    mod.controller('solicitudMantenimientoItemCtrl', ['$modalInstance', 'bicisService', 'solicitud',
                                     function ($modalInstance, bicisSvc, solicitud) {
    	this.guardar = function(valid, errores) {
    		if(!valid) {
                var mensaje = '';
                if(!!errores.required) {
                    mensaje += 'Completa todos los campos.';
                }
                this.error = {
                        status: true,
                        encabezado: 'Completa correctamente el formulario',
                        tipo: 'danger',
                        mensaje: mensaje                  
                };
    		} else {
                bicisSvc.getBici(solicitud.bicicleta)
                    .success(function(bici) {
                        if(bici.puntoPrestamo && bici.disponible) {
                            $modalInstance.close(this.solicitud);
                        } else if (!bici.puntoPrestamo) {
                            this.error = {
                                status: true,
                                encabezado: 'Error',
                                tipo: 'danger',
                                mensaje: 'La bicicleta se encuentra prestada.'                  
                            }
                        } else {
                            this.error = {
                                status: true,
                                encabezado: 'Error',
                                tipo: 'danger',
                                mensaje: 'La bicicleta ya está en mantenimiento.'                  
                            }
                        }
                    }.bind(this))
                    .error(function(error) {
                        this.error = {
                            status: true,
                            encabezado: 'Completa correctamente el formulario',
                            tipo: 'danger',
                            mensaje: 'Ingresa un id de bicicleta válido. Está pintado sobre la bicicleta.'                  
                        }
                    }.bind(this));
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.solicitud = solicitud;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
