(function(ng){
    var mod = ng.module('reporteAdminModule');
    
    mod.service('reporteAdminService', function($http){

        this.getUsuarios = function() {
            return $http.get('https://bf43.herokuapp.com/api/usuarios/').then(
                    function(response) {
                        return response['data'];
                    });
        };

        this.getMultas = function() {
            return $http.get('https://bf43.herokuapp.com/api/tiposInfraccion/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        };

    	this.getBicisMantenimiento = function() {
        	return $http.get('https://bf43.herokuapp.com/api/reportes/numBicicletasMantenimiento/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

        this.getBicisMasPrestadas= function() {
            return $http.get('https://bf43.herokuapp.com/api/reportes/tiposBicicletasMasPrestadas/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        };

        this.getNumerosPuntos = function() {
            return $http.get('https://bf43.herokuapp.com/api/reportes/numerosPunto/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        };

        this.getPrestamosMes = function() {
            return $http.get('https://bf43.herokuapp.com/api/reportes/numPrestamosMes/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
            
        };

        this.getTrayectosPrestamos = function() {
            return $http.get('https://bf43.herokuapp.com/api/reportes/rutasNum/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }
   });
})(window.angular);
