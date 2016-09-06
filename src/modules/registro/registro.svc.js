(function(ng){
    var mod = ng.module('registroModule');
    
    mod.service('registroService', ['$http', function ($http) {
        this.registrarUsuario = function (usuario) {
            return $http.post('https://bikes4free.herokuapp.com/api/usuarios/', usuario).then(
            	function(response) {
            		return response['data'];
            	});
        };
        
    	this.getUsuario = function(idUsuario) {
            return $http.get('https://bikes4free.herokuapp.com/api/usuarios/' + idUsuario).then(
                   	function (response) {
                   		return response['data'];
                   	});
    	}
    }]);
})(window.angular);
 	