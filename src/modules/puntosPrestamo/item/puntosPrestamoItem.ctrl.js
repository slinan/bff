(function (ng) {
    var mod = ng.module('puntosPrestamoModule');

    mod.controller('puntosPrestamoItemCtrl', ['$modalInstance', 'puntoPrestamo', 
                                     function ($modalInstance, puntoPrestamo) {
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
        		$modalInstance.close(this.puntoPrestamo);
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.puntoPrestamo = puntoPrestamo;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
