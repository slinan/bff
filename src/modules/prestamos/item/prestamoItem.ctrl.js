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
                            if(this.verificarUsuarios()) {
                                $modalInstance.close(this.prestamo);
                            }
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

        this.verificarUsuarios = function() {
                var idUsuario;
                var idUsuarioAutorizado;

                for (var key in this.usuarios) {
                  if(this.usuarios[key].username == this.usuarioAutorizado) {
                    idUsuarioAutorizado = key;
                  } 
                  if(this.usuarios[key].username == this.usuario) {
                    idUsuario = key;
                  }
                }

                if(!idUsuarioAutorizado || !idUsuario) {
                    this.error = {
                            status: true,
                            encabezado: 'Completa correctamente el formulario',
                            tipo: 'danger',
                            mensaje: 'Ingresa usuarios válidos.'                  
                        };
                    return false;
                } else {
                    this.prestamo.usuarioAutorizado = idUsuarioAutorizado;
                    this.prestamo.usuario = idUsuario;
                    return true;
                }
        }

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
        this.infoAnterior = !!this.prestamo.usuario;
        this.usuario = this.prestamo.usuario && this.usuarios[this.prestamo.usuario].username
        this.usuarioAutorizado = this.prestamo.usuarioAutorizado && this.usuarios[this.prestamo.usuarioAutorizado].username

        if(!!this.prestamo.bicicleta) {
            this.getPunto();
        }
        this.error = {
            status: false
        };
   }]);
})(window.angular);
