(function (ng) {
    var mod = ng.module('multasModule');

    mod.controller('multasItemCtrl', ['$modalInstance', 'multa', 
                                     function ($modalInstance, multa) {
    	this.guardar = function(valid, errores) {
    		if(!valid) {
                var mensaje = '';
                if(!!errores.required) {
                    mensaje += 'Completa todos los campos.';
                }
                
                if(!!errores.number) {
                    mensaje += 'Los campos numéricos no son válidos.';
                }
                
                this.error = {
                        status: true,
                        encabezado: 'Completa correctamente el formulario',
                        tipo: 'danger',
                        mensaje: mensaje                  
                };
    		} else {
        		$modalInstance.close(this.multa);
    		}
            
    	};
                                         this.errorOrSuccess = function(field) {
    		return {
    			'has-success': field.$dirty && field.$valid, 
    			'has-error': field.$dirty && field.$invalid
    			};
    	};

    	this.cerrar = function() {
            console.log("cerrar");
    	  $modalInstance.dismiss();
    	};
    	
    	this.multa = multa;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
