(function (ng) {

    var mainApp = ng.module('mainApp', [
        'authModule',
        'cookiesModule',
        'errorsModule',
        'ngRoute',
        'redireccionModule',
        'registroModule',
        'tiposBiciModule',
        'puntosPrestamoModule',
        'multasModule',
        'usuariosModule',
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
                .otherwise({
                	redirectTo: '/home'
                });

        /*$httpProvider.interceptors.push(['$q', 'cookiesService', 'redireccionService',
                                         function($q, cookiesSvc, redirect) {
            
                    return {
                        'responseError': function(response) {
                            if(response.status == 401) {
                                redirect.aLogin();
                            }                        
                        }
                    }
                }]);*/
        }]);
})(window.angular);
