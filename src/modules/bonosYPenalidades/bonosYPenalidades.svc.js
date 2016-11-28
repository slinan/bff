(function(ng){
    var mod = ng.module('bonosYPenalidadesModule');
    
    mod.service('bonosYPenalidadesService', function($http){

    	this.getBonos = function(userId) {
        	return $http.get('https://bf43.herokuapp.com/api/bonos/?usuario='+userId).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

        this.getPenalidades = function(userId) {
            return $http.get('https://bf43.herokuapp.com/api/penalidades/?usuario='+userId).then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        };

   });
})(window.angular);
