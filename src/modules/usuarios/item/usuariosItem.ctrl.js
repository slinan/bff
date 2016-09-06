(function (ng) {
    var mod = ng.module('usuariosModule');

    mod.controller('usuariosItemCtrl', ['$modalInstance', 'usuario', 
                                     function ($modalInstance, usuario) {
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
        		$modalInstance.close(this.usuario);
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.usuario = usuario;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
