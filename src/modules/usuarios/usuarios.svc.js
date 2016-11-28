(function(ng){
    var mod = ng.module('usuariosModule');
    
    mod.service('usuariosService', function($http){

    	this.getUsuarios = function() {
        	return $http.get('https://bf43.herokuapp.com/api/usuarios/').then(
        			function(response) {
        				return response['data'];
            		});
    	};

    	this.nuevoUsuario = function(usuario) {
        	return $http.post('https://bf43.herokuapp.com/api/usuarios/', usuario).then(
        			function(response) {
        				return response['data'];
            		});
    	}

    	this.actualizarUsuario = function(usuario) {
        	return $http.put('https://bf43.herokuapp.com/api/usuarios/' + usuario.id + "/", usuario)
            .success(function(response) {
                   return response['data'];
                }).error(function(httpObj, textStatus) {
                    return {error: textStatus};
            	});
    	}

        this.volverAdmin = function(usuario) {
            return $http.get('https://bf43.herokuapp.com/api/volverAdmin/' + usuario.id + "/").then(
                    function(response) {
                        return response['data'];
                    })
        }

        this.volverFuncionario = function(usuario) {
            return $http.get('https://bf43.herokuapp.com/api/volverFuncionario/' + usuario.id + "/").then(
                    function(response) {
                        return response['data'];
                    })
        }
 
        this.eliminarUsuario = function(usuario) {
            return $http.delete('https://bf43.herokuapp.com/api/usuarios/' + usuario.id + "/").then(
                    function(response) {
                        return response['data'];
                    });
        }
   });
})(window.angular);
