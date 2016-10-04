(function(ng){
    var mod = ng.module('bicisModule');
    
    mod.service('bicisService', function($http){

    	this.getBicis = function() {
        	return $http.get('https://bf42.herokuapp.com/api/bicicletas/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.crearBici = function(bici) {
        	return $http.post('https://bf42.herokuapp.com/api/bicicletas/', bici).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

    	this.actualizarBici = function(bici) {
        	return $http.put('https://bf42.herokuapp.com/api/bicicletas/' + bici.id + "/", bici).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.eliminarBici = function(bici) {
            return $http.delete('https://bf42.herokuapp.com/api/bicicletas/' + bici.id + "/").then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }

        this.getBici = function(idBici) {
            return $http.get('https://bf42.herokuapp.com/api/bicicletas/' + idBici + '/')
                .success(
                    function(response) {
                        return response['data'];
                    })
                .error(
                    function(httpObj, textStatus) {
                        return {error: textStatus};
                    });
        }

        this.quitarPuntoPrestamoBici = function(idBici) {
            return $http.get('https://bf42.herokuapp.com/api/bicicletas/' + idBici + '/').then(
                function(response) {
                    var bici = response['data'];
                    bici.puntoPrestamo = null;
                    return this.actualizarBici(bici);
                }.bind(this))
        }

        this.asignarPuntoPrestamoBici = function(idBici, idPuntoPrestamo) {
            return $http.get('https://bf42.herokuapp.com/api/bicicletas/' + idBici + '/').then(
                function(response) {
                    var bici = response['data'];
                    bici.puntoPrestamo = idPuntoPrestamo;
                    return this.actualizarBici(bici);
                }.bind(this))
        }

   });
})(window.angular);
