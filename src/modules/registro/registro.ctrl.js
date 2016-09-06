(function (ng) {
    var mod = ng.module('registroModule');

    mod.controller('registroCtrl', ['registroService', 'redireccionService', 'authService', 'cookiesService', 'redireccionConstants', 'dateFilter',
                                   		function (svc, redirect, authSvc, cookiesSvc, urls, dateFilter) {
                
        this.crearUsuario = function(valid) {
        	if(true) {
                this.usuario.tipoUsuario = "U"
                this.usuario.fechaNacimiento = dateFilter(this.usuario.fechaNacimiento, 'yyyy-MM-dd'); 
        		svc.registrarUsuario(this.usuario).then(
        				function(data) {
        			        this.errorUsuario = {status: false};
        					if(!data.error) {
        						var dataCookie = {
            						id: data.id,
            						rol: data.tipoUsuario
            					};
                                cookiesSvc.crearCookieDeAutorizacion(dataCookie);
                				redirect.aHome();        						
        					} else {
        						this.errorUsuario = {
        								status: true,
        								encabezado: 'El correo electrónico ya está registrado',
        	                        	tipo: 'danger',
        	                        	mensaje: ' ¿Olvidó su contraseña? ',                  
        	                        	link: urls.RESTABLECER_CONTRASENIA
        						}
        					}
        				}.bind(this));
        	} else {
                console.log("no coinciden")
            }
        };
    	
        this.contraseniasNoCoinciden = function() {
            console.log(this.usuario.password);
            console.log(this.confirmacion.password);
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
   }]);
})(window.angular);
