(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('authCtrl', ['$scope', 'authService', 'cookiesService', 'redireccionService',
                                function ($scope, svc, cookiesSvc, redirect) {   	
        
    	this.login = function () {
            svc.login(this.usuario).success(function(data) {
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
                var mensaje = data.non_field_errors[0];
                this.error = {
                        status: true,
                        encabezado: 'Error de autenticación',
                        tipo: 'danger',
                        mensaje: mensaje               
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
            return !!cookiesSvc.getCookieDeAutorizacion() && cookiesSvc.getCookieDeAutorizacion().is_admin;
        };

        this.esFuncionario = function() {
            return !!cookiesSvc.getCookieDeAutorizacion() && cookiesSvc.getCookieDeAutorizacion().is_staff;
        };

        this.esUsuario = function() {
            return !this.esAdmin() && !this.esFuncionario();
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
          
        this.irAHacerReserva = function() {
            redirect.aHacerReserva();
        }

        this.irACrearPrestamo = function() {
            redirect.aCrearPrestamo();
        }

        this.irAPrestamosUsuario = function() {
            redirect.aPrestamosUsuario();
        }

        this.irAReporte = function() {
            redirect.aReporte();
        }

        this.irAReporteAdmin = function() {
            redirect.aReporteAdmin();
        }

        this.irABicis = function() {
            redirect.aBicis();
        }

        this.irAReviews = function() {
            redirect.aReviews();
        }

        this.irARetornos = function() {
            redirect.aRetornos();
        }

        this.irASolicitudes = function() {
            redirect.aSolicitudes();
        }

        this.irABusquedaMultas = function() {
            redirect.aBusquedaMultas();
        }

        this.irAMisMultas = function() {
            redirect.aMisMultas();
        }

        this.irAConsolidacion = function() {
            redirect.aConsolidacion();
        }

        this.irABonosYPenalidades = function() {
            redirect.aBonosYPenalidades();
        }

        this.usuario = {
    		username: undefined,
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
            // Evita que un usuario no funcionario acceda a las vistas de funcionario.
            } else if (this.autenticado() && !this.esFuncionario() && redirect.urlForbiddenNoFuncionario(nextUrl)) {
                this.irAHome();
            // Evita que un usuario no regular acceda a las vistas de usuarios regulares.
            } else if (this.autenticado() && !this.esUsuario() && redirect.urlForbiddenNoUsuario(nextUrl)) {
                this.irAHome();
            }
        }.bind(this));
    }]);
})(window.angular);
