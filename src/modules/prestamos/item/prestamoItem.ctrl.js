(function (ng) {
    var mod = ng.module('prestamosModule');

    mod.controller('prestamoItemCtrl', ['$modalInstance', 'bicisService', 'prestamo', 'usuarios', 'puntosPrestamo',
                                     function ($modalInstance, bicisSvc, prestamo, usuarios, puntosPrestamo) {
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
                bicisSvc.getBici(prestamo.bicicleta)
                    .success(function(bici) {
                        if(bici.puntoPrestamo) {
                            $modalInstance.close(this.prestamo);
                        } else {
                            this.error = {
                                status: true,
                                encabezado: 'Error',
                                tipo: 'danger',
                                mensaje: 'La bicicleta ya se encuentra prestada.'                  
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

        this.getPunto = function() {
                bicisSvc.getBici(prestamo.bicicleta)
                    .success(function(bici) {
                        if(bici.puntoPrestamo) {
                            this.prestamo.punto = bici.puntoPrestamo;
                        } else {
                            this.error = {
                                status: true,
                                encabezado: 'Error',
                                tipo: 'danger',
                                mensaje: 'La bicicleta ya se encuentra prestada.'                  
                            }
                        }
                    }.bind(this))
                    .error(function(error) {
                        this.error = {
                            status: true,
                            encabezado: 'Error',
                            tipo: 'danger',
                            mensaje: 'Ingresa un id de bicicleta válido. Está pintado sobre la bicicleta.'                  
                        }
                    }.bind(this));
        }

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.prestamo = prestamo;
        this.usuarios = usuarios;
        this.puntosPrestamo = puntosPrestamo;
        if(!!this.prestamo.bicicleta) {
            this.getPunto();
        }
        this.error = {
            status: false
        };
   }]);
})(window.angular);
