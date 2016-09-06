(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('authCtrl', ['$scope', 'authService', 'cookiesService', 'redireccionService',
                                function ($scope, svc, cookiesSvc, redirect) {   	
        
    	this.login = function () {
            svc.login(this.usuario).success(function(data) {
                var dataCookie = {
                    id: data.id,
                    rol: data.tipoUsuario
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
        }

        this.logout = function () {
            cookiesSvc.borrarCookieDeAutorizacion();
            redirect.aHome();  
        }

        this.autenticado = function() {
        	return !!cookiesSvc.getCookieDeAutorizacion();
        };
        
        this.esAdmin = function() {
            return !!cookiesSvc.getCookieDeAutorizacion() && cookiesSvc.getCookieDeAutorizacion().rol == "A";
        };

        this.irALogin = function () {
        	redirect.aLogin();
        };
        
        this.irARegistro = function () {
            redirect.aRegistro();
        };
        
        this.irAHome = function() {
            redirect.aHome();
        }; 

        this.irATiposBici = function() {
            redirect.aTiposBici();
        }

        this.irATiposMulta = function() {
            redirect.aTiposMulta();
        }

        this.irAPuntosPrestamo = function() {
            redirect.aPuntosPrestamo();
        }

        this.irAUsuarios = function() {
            redirect.aUsuarios();
        }
                        
        this.usuario = {
    		email: undefined,
    		password: undefined
        };

        this.error = {
            status: false
        };

        $scope.$on('$routeChangeStart', function(scope, next, current) {
            var nextUrl = next.$$route && next.$$route.originalPath;
            // Evita que un usuario ya autenticado acceda a los formularios de login y de registro.
            if(this.autenticado() && redirect.urlForbiddenCuandoAutenticado(nextUrl)) {
                this.irAHome();
            // Evita que un usuario no autenticado acceda a las vistas de usuarios autenticados.
            } else if (!this.autenticado() && redirect.urlForbiddenNoAutenticado(nextUrl)) {
                this.irAHome();
            // Evita que un usuario no administrador acceda a las vistas de admin.
            } else if (this.autenticado() && !this.esAdmin() && redirect.urlForbiddenNoAdmin(nextUrl)) {
                this.irAHome();
            }
        }.bind(this));
    }]);
})(window.angular);
