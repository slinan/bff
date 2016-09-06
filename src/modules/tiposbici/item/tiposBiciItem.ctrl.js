(function (ng) {
    var mod = ng.module('tiposBiciModule');

    mod.controller('tiposBiciItemCtrl', ['$modalInstance', 'tipoBici', 
                                     function ($modalInstance, tipoBici) {
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
        		$modalInstance.close(this.tipoBici);
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.tipoBici = tipoBici;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
