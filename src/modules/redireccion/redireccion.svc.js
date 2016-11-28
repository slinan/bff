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

        this.aHacerReserva = function() {
            $location.path(urls.HACER_RESERVA);
        }

        this.aCrearPrestamo = function() {
            $location.path(urls.CREAR_PRESTAMO);
        }

        this.aPrestamosUsuario = function() {
            $location.path(urls.PRESTAMOS_USUARIO);
        }

        this.aReporte = function() {
            $location.path(urls.REPORTE);
        }

        this.aReporteAdmin = function() {
            $location.path(urls.REPORTE_ADMIN);
        }

        this.aBicis = function() {
            $location.path(urls.BICIS);
        }

        this.aReviews = function() {
            $location.path(urls.REVIEWS);
        }

        this.aRetornos = function() {
            $location.path(urls.RETORNOS);
        }

        this.aSolicitudes = function() {
            $location.path(urls.SOLICITUDES);
        }

        this.aBusquedaMultas = function() {
            $location.path(urls.BUSQUEDA_MULTAS);
        }

        this.aMisMultas = function() {
            $location.path(urls.MIS_MULTAS);
        }
 
        this.aConsolidacion = function() {
            $location.path(urls.CONSOLIDACION);
        }

        this.aBonosYPenalidades = function() {
            $location.path(urls.BONOSYPENALIDADES);
        }

    	this.urlForbiddenCuandoAutenticado = function(url) {
    		return url == urls.LOGIN
    			|| url == urls.REGISTRO;
    	}

        this.urlForbiddenNoAdmin = function(url) {
            return url == urls.TIPOS_BICI
                || url == urls.TIPOS_MULTA
                || url == urls.PUNTOS_PRESTAMO
                || url == urls.USUARIOS
                || url == urls.BICIS
                || url == urls.BUSQUEDA_MULTAS
                || url == urls.REPORTE_ADMIN
                || url == urls.CONSOLIDACION;
        }

        this.urlForbiddenNoFuncionario = function(url) {
            return url == urls.CREAR_PRESTAMO
                || url == urls.RETORNOS
                || url == urls.SOLICITUDES;
        }

        this.urlForbiddenNoUsuario = function(url) {
            return url == urls.PRESTAMOS_USUARIO
                || url == urls.HACER_RESERVA
                || url == urls.MIS_MULTAS
                || url == urls.BONOSYPENALIDADES;
        }

        this.urlForbiddenNoAutenticado = function(url) {
            return this.urlForbiddenNoAdmin(url)
                || this.urlForbiddenNoFuncionario(url)
                || this.urlForbiddenNoUsuario(url);
        }
    }]);
})(window.angular);

