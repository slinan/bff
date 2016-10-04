(function (ng) {
    var mod = ng.module('usuariosModule');

    mod.controller('usuariosItemCtrl', ['$modalInstance', 'usuario', 
                                     function ($modalInstance, usuario) {
        this.guardar = function(valid, errores) {
            if(!valid || this.contraseniasNoCoinciden()) {
                var mensaje = '';
                if(!!errores.required) {
                    mensaje = 'Completa todos los campos.';
                } else if(this.contraseniasNoCoinciden()) {
                    mensaje = 'Las contraseñas no coinciden.';
                } else {
                    mensaje = 'Campos inválidos.';
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

        this.contraseniasNoCoinciden = function() {
            return !!this.usuario.password 
                && !!this.confirmacion.password
                && this.usuario.password != this.confirmacion.password;
        };

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.usuario = usuario;
        this.confirmacion = {password: ""}
        this.error = {
            status: false
        };
   }]);
})(window.angular);
