(function(ng){
    var mod = ng.module('registroModule');
    
    mod.service('registroService', ['$http', function ($http) {
        this.registrarUsuario = function (usuario) {
            return $http.post('https://bf42.herokuapp.com/api/usuarios/', usuario)
                .success(function(response) {
            	   return response['data'];
                }).error(function(httpObj, textStatus) {
                    return {error: textStatus};
            });
        };
        
    	this.getUsuario = function(idUsuario) {
            return $http.get('https://bf42.herokuapp.com/api/usuarios/' + idUsuario).then(
                   	function (response) {
                   		return response['data'];
                   	});
    	}
    }]);
})(window.angular);
 	