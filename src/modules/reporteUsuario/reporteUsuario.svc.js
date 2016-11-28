(function(ng){
    var mod = ng.module('reporteUsuarioModule');
    
    mod.service('reporteUsuarioService', function($http){

    	this.getPuntosUsuario = function(user_id) {
        	return $http.get('https://bf43.herokuapp.com/api/puntosRetornoMasUsados/4/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};
        this.getHorariosUsuario = function(user_id) {
        	return $http.get('https://bf43.herokuapp.com/api/horarioMasFrecuente/3/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.getTiempo = function(user_id) {
        	return $http.get('https://bf43.herokuapp.com/api/tiempoPrestamoBicis/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};
        this.getRutas= function(user_id) {
        	return $http.get('https://bf43.herokuapp.com/api/rutas/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

        
   });
})(window.angular);
