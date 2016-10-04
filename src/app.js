(function (ng) {

    var mainApp = ng.module('mainApp', [
        'authModule',
        'bicisModule',
        'confirmacionModule',
        'cookiesModule',
        'errorsModule',
        'multasModule',
        'ngRoute',
        'prestamosModule',
        'puntosPrestamoModule',
        'redireccionModule',
        'registroModule',
        'reservasModule',
        'retornosModule',
        'reviewModule',
        'tiposBiciModule',
        'usuariosModule',
        'reporteUsuarioModule',
        'ui.bootstrap',
        'ngCrud'
    ]);
    
    var commonRoot = 'src/modules/';
    var ctrlAlias = 'ctrl';
    
    mainApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            
    	$routeProvider
                .when('/home', {
                    templateUrl: commonRoot + 'home/home.tpl.html',
                })
                .when('/tiposBici', {
                    templateUrl: commonRoot + 'tiposbici/tiposBici.tpl.html',
                    controller: 'tiposBiciCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/puntosPrestamo', {
                    templateUrl: commonRoot + 'puntosPrestamo/puntosPrestamo.tpl.html',
                    controller: 'puntosPrestamoCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/registro', {
                    templateUrl: commonRoot + 'registro/registro.tpl.html',
                    controller: 'registroCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/login', {
                    templateUrl: commonRoot + 'auth/login.tpl.html',
                    controller: 'authCtrl',
                    controllerAs: ctrlAlias
                })  
                .when('/multas', {
                    templateUrl: commonRoot + 'multas/multas.tpl.html',
                    controller: 'multasCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/usuarios', {
                    templateUrl: commonRoot + 'usuarios/usuarios.tpl.html',
                    controller: 'usuariosCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/reservas', {
                    templateUrl: commonRoot + 'reservas/reservas.tpl.html',
                    controller: 'reservasCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/bicis', {
                    templateUrl: commonRoot + 'bici/bici.tpl.html',
                    controller: 'bicisCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/prestamos', {
                    templateUrl: commonRoot + 'prestamos/reservas.tpl.html',
                    controller: 'prestamosCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/prestamos-usuario', {
                    templateUrl: commonRoot + 'prestamos/prestamos-usuario.tpl.html',
                    controller: 'prestamosUsuarioCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/reviews', {
                    templateUrl: commonRoot + 'reviews/puntosPrestamo.tpl.html',
                    controller: 'reviewsCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/retornos', {
                    templateUrl: commonRoot + 'retornos/prestamos.tpl.html',
                    controller: 'retornosCtrl',
                    controllerAs: ctrlAlias
                })
                .when('/reporteUsuario', {
                    templateUrl: commonRoot + 'reporteUsuario/reporteUsuario.tpl.html',
                    controller: 'reporteUsuarioCtrl',
                    controllerAs: ctrlAlias
                })
                .otherwise({
                	redirectTo: '/home'
                });

        $httpProvider.interceptors.push(['$q', 'cookiesService', 'redireccionService', 
                                            function($q, cookiesSvc, redirect) {
                    return{
                        'request': function(config){
                            if (typeof cookiesSvc.getCookieDeAutorizacion() != 'undefined'){
                                config.headers['Authorization'] = 'Token '+ cookiesSvc.getCookieDeAutorizacion().token;
                            }
                            return config;
                        },
                        'responseError': function(response) {
                            // unauthorized or forbidden
                            if(response.status == 401 || response.status == 403) {
                                redirect.aLogin();
                            }
                            return $q.reject(response);
                        }
                    }
                }]);
        }]);
})(window.angular);
