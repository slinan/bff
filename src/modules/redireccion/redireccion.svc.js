(function (ng) {

    var mod = ng.module('redireccionModule');

    mod.service('redireccionService', ['$location', 'redireccionConstants',
                                function ($location, urls) {    	
    	
    	this.aLogin = function () {
        	$location.path(urls.LOGIN);
        };
        
        this.aRegistro = function () {
        	$location.path(urls.REGISTRO);
        };
        
        this.aHome = function () {
        	$location.path(urls.HOME);
        };

        this.aTiposBici = function() {
            $location.path(urls.TIPOS_BICI);
        }

        this.aTiposMulta = function() {
            $location.path(urls.TIPOS_MULTA);
        }

        this.aPuntosPrestamo = function() {
            $location.path(urls.PUNTOS_PRESTAMO);
        }

        this.aUsuarios = function() {
            $location.path(urls.USUARIOS);
        }

    	this.urlForbiddenCuandoAutenticado = function(url) {
    		return url == urls.LOGIN
    			|| url == urls.REGISTRO;
    	}

        this.urlForbiddenNoAdmin = function(url) {
            return url == urls.TIPOS_BICI
                || url == urls.TIPOS_MULTA
                || url == urls.PUNTOS_PRESTAMO
                || url == urls.USUARIOS;
        }

        this.urlForbiddenNoAutenticado = function(url) {
            return this.urlForbiddenNoAdmin(url);
        }
    }]);
})(window.angular);

