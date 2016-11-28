(function(ng){
    var mod = ng.module('multasBusquedaModule');
    
    mod.service('multasBusquedaService', function($http){

    	this.getMultasPunto = function(idPunto) {
        	return $http.get('https://bf43.herokuapp.com/api/puntosPrestamo/' + idPunto + '/multas/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

        this.getMultasUsuario = function(idUsuario) {
            return $http.get('https://bf43.herokuapp.com/api/usuarios/' + idUsuario + '/multas/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        };

    	this.getMisMultas = function(solicitud) {
        	return $http.get('https://bf43.herokuapp.com/api/misMultas/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}
   });
})(window.angular);
