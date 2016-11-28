(function(ng){
    var mod = ng.module('consolidadoPuntosModule');
    
    mod.service('consolidadoPuntosService', function($http){

    	this.consolidarPuntosUsuario = function(user_id) {
            console.log("entra a consolidar usuario "+user_id)
        	return $http.get('https://bf43.herokuapp.com/api/consolidar/' + user_id + '/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};
   });
})(window.angular);
