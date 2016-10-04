(function(ng){
    var mod = ng.module('tiposBiciModule');
    
    mod.service('tiposBiciService', function($http){

    	this.getTiposBici = function() {
        	return $http.get('https://bf42.herokuapp.com/api/tiposBicicleta/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.nuevoTipoBici = function(tipoBici) {
        	return $http.post('https://bf42.herokuapp.com/api/tiposBicicleta/', tipoBici).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

    	this.actualizarTipoBici = function(tipoBici) {
        	return $http.put('https://bf42.herokuapp.com/api/tiposBicicleta/' + tipoBici.id + "/", tipoBici).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.eliminarTipoBici = function(tipoBici) {
            return $http.delete('https://bf42.herokuapp.com/api/tiposBicicleta/' + tipoBici.id + "/").then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }
   });
})(window.angular);
