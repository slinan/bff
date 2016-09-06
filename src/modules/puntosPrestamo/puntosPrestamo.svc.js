(function(ng){
    var mod = ng.module('puntosPrestamoModule');
    
    mod.service('puntosPrestamoService', function($http){

    	this.getPuntosPrestamo = function() {
        	return $http.get('https://bikes4free.herokuapp.com/api/puntosPrestamo/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.nuevoPuntoPrestamo = function(puntoPrestamo) {
        	return $http.post('https://bikes4free.herokuapp.com/api/puntosPrestamo/', puntoPrestamo).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

    	this.actualizarPuntoPrestamo = function(puntoPrestamo) {
        	return $http.put('https://bikes4free.herokuapp.com/api/puntosPrestamo/' + puntoPrestamo.id + "/", puntoPrestamo).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.eliminarPuntoPrestamo = function(puntoPrestamo) {
            return $http.delete('https://bikes4free.herokuapp.com/api/puntosPrestamo/' + puntoPrestamo.id + "/").then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }

        this.getBicicletasEnPunto = function(puntoId) {
            return $http.get('https://bikes4free.herokuapp.com/api/bicicletasEnPunto/' + puntoId).then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }
   });
})(window.angular);
