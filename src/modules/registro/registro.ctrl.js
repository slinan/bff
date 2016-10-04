(function (ng) {
    var mod = ng.module('registroModule');

    mod.controller('registroCtrl', ['registroService', 'redireccionService', 'authService', 'cookiesService', 'redireccionConstants', 'dateFilter',
                                   		function (svc, redirect, authSvc, cookiesSvc, urls, dateFilter) {
                
        this.crearUsuario = function(valid) {
        	if(valid && !this.contraseniasNoCoinciden()) {
        		svc.registrarUsuario(this.usuario)
                    .success(
        				function(data) {
        			        this.error = {status: false};
                            this.usuario = {username: data.username, password: this.usuario.password}
                            authSvc.login(this.usuario).success(function(data) {
                                console.log(data)
                                var dataCookie = {
                                    id: data.id,
                                    token: data.token,
                                    is_admin: data.user.groups.indexOf(2)!=-1,
                                    is_staff: data.user.groups.indexOf(1)!=-1
                                };
                                cookiesSvc.crearCookieDeAutorizacion(dataCookie);
                                redirect.aHome();                               
                            }.bind(this)).error(function(data) {
                                this.error = {
                                        status: true,
                                        encabezado: 'Credenciales Inválidas',
                                        tipo: 'danger',
                                        mensaje: 'Las credenciales provistas no son correctas.'                  
                                };
                                this.usuario.password = '';
                            }.bind(this));
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
