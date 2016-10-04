(function (ng) {
    var mod = ng.module('prestamosModule');

    mod.controller('prestamoUsuarioItemCtrl', ['$modalInstance', 'prestamo', 'usuarios', 'puntosPrestamo',
                                     function ($modalInstance, prestamo, usuarios, puntosPrestamo) {
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
                var idUsuarioAutorizado;
                for (var key in this.usuarios) {
                  if(this.usuarios[key].username == this.usuarioAutorizado) {
                    idUsuarioAutorizado = key;

                  }
                }
                if(!idUsuarioAutorizado) {
                    this.error = {
                            status: true,
                            encabezado: 'Completa correctamente el formulario',
                            tipo: 'danger',
                            mensaje: 'Ingresa un usuario válido.'                  
                        };
                } else {
                    this.prestamo.usuarioAutorizado = idUsuarioAutorizado;
                    $modalInstance.close(this.prestamo);
                }
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.prestamo = prestamo;
        this.usuarios = usuarios;
        this.puntosPrestamo = puntosPrestamo;
        this.usuarioAutorizado = this.usuarios[this.prestamo.usuarioAutorizado].username
        console.log(this.usuarioAutorizado)
        this.error = {
            status: false
        };
   }]);
})(window.angular);
