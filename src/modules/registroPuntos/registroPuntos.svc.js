(function(ng){
    var mod = ng.module('registroPuntosModule');
    
    mod.service('registroPuntosService', function($http){

    	this.nuevoRegistroPuntos = function(usuario_id, registroPuntos) {
            registro = {usuario: usuario_id, puntos: registroPuntos.puntos, razon: registroPuntos.razon};
        	return $http.post('https://bf43.herokuapp.com/api/registrosPuntos/', registro).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};
   });
})(window.angular);
