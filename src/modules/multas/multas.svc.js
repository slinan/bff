(function(ng){
    var mod = ng.module('multasModule');
    
    mod.service('multasService', function($http){

    	this.getMultas = function() {
        	return $http.get('https://bikes4free.herokuapp.com/api/tiposInfraccion/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.nuevoMulta = function(multa) {
        	return $http.post('https://bikes4free.herokuapp.com/api/tiposInfraccion/', multa).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

    	this.actualizarMulta = function(multa) {
        	return $http.put('https://bikes4free.herokuapp.com/api/tiposInfraccion/' + multa.id + "/", multa).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.eliminarMulta = function(multa) {
            return $http.delete('https://bikes4free.herokuapp.com/api/tiposInfraccion/' + multa.id + "/").then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }
   });
})(window.angular);
