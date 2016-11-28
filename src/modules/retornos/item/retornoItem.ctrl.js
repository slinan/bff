(function (ng) {
    var mod = ng.module('retornosModule');

    mod.controller('retornoItemCtrl', ['$modalInstance', 'bicisService', 'prestamo', 'usuarios', 'puntosPrestamo', 'tiposMultas', 'tiposPuntos',
                                     function ($modalInstance, bicisSvc, prestamo, usuarios, puntosPrestamo, tiposMultas, tiposPuntos) {
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
                $modalInstance.close(this.retorno);
    		}
    	};

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.prestamo = prestamo;
        this.retorno = {prestamo: prestamo.id, bicicleta: prestamo.bicicleta, usuario: prestamo.usuario};
        this.usuarios = usuarios;
        this.usuarioAutorizado = this.usuarios[this.prestamo.usuarioAutorizado].username
        this.usuario = this.usuarios[this.prestamo.usuario].username
        this.puntosPrestamo = puntosPrestamo;
        this.tiposMultas = tiposMultas;
        this.tiposPuntos = tiposPuntos;
        this.error = {
            status: false
        };
   }]);
})(window.angular);
