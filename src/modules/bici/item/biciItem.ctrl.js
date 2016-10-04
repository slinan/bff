(function (ng) {
    var mod = ng.module('bicisModule');

    mod.controller('bicisItemCtrl', ['$modalInstance', 'bici', 'tiposBici', 'puntosPrestamo',
                                     function ($modalInstance, bici, tiposBici, puntosPrestamo) {
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
        		$modalInstance.close(this.bici);
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.bici = bici;
        console.log(this.bici);
        this.tiposBici = tiposBici;
        this.puntosPrestamo = puntosPrestamo;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
