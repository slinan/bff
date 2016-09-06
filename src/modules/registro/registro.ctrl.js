(function (ng) {
    var mod = ng.module('registroModule');

    mod.controller('registroCtrl', ['registroService', 'redireccionService', 'authService', 'cookiesService', 'redireccionConstants', 'dateFilter',
                                   		function (svc, redirect, authSvc, cookiesSvc, urls, dateFilter) {
                
        this.crearUsuario = function(valid) {
        	if(valid && !this.contraseniasNoCoinciden()) {
                this.usuario.tipoUsuario = "U"
                this.usuario.fechaNacimiento = dateFilter(this.usuario.fechaNacimiento, 'yyyy-MM-dd'); 
        		svc.registrarUsuario(this.usuario)
                    .success(
        				function(data) {
        			        this.error = {status: false};
        					if(!data.error) {
        						var dataCookie = {
            						id: data.id,
            						rol: data.tipoUsuario
            					};
                                cookiesSvc.crearCookieDeAutorizacion(dataCookie);
                				redirect.aHome();        						
        					} else {
        						this.error = {
        								status: true,
        								encabezado: 'El correo electrónico ya está registrado',
        	                        	tipo: 'danger',
        	                        	mensaje: ' ¿Olvidó su contraseña? ',                  
        	                        	link: urls.RESTABLECER_CONTRASENIA
        						}
        					}
        				}.bind(this))
                    .error(function(data){
                        this.error = {
                            status: true,
                            encabezado: 'Error',
                            tipo: 'danger',
                            mensaje: data.error,                  
                        }
                    }.bind(this));
        	} else {
                var mensaje = valid ? 'Ambas contraseñas deben coincidir.' : 'Completa correctamente el formulario'
                this.error = {
                        status: true,
                        encabezado: 'Error',
                        tipo: 'danger',
                        mensaje: mensaje                  
                };
                this.usuario.password = '';
                this.confirmacion.password = '';
            }
        };
    	
        this.contraseniasNoCoinciden = function() {
        	return !!this.usuario.password 
        		&& !!this.confirmacion.password
        		&& this.usuario.password != this.confirmacion.password;
        };
        
        this.irAHome = function() {
        	redirect.aHome();
        };
    	
    	this.errorOrSuccess = function(field) {
    		return {
    			'has-success': field.$dirty && field.$valid, 
    			'has-error': field.$dirty && field.$invalid
    			};
    	};

        this.error = {
            status: false
        };

        this.usuario = {};
        this.confirmacion = {};
   }]);
})(window.angular);
