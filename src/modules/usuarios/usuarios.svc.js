(function(ng){
    var mod = ng.module('usuariosModule');
    
    mod.service('usuariosService', function($http){

    	this.getUsuarios = function() {
        	return $http.get('https://bikes4free.herokuapp.com/api/usuarios/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.nuevoUsuario = function(usuario) {
        	return $http.post('https://bikes4free.herokuapp.com/api/usuarios/', usuario).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

    	this.actualizarUsuario = function(usuario) {
        	return $http.put('https://bikes4free.herokuapp.com/api/usuarios/' + usuario.id + "/", usuario).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.eliminarUsuario = function(usuario) {
            return $http.delete('https://bikes4free.herokuapp.com/api/usuarios/' + usuario.id + "/").then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }
   });
})(window.angular);
