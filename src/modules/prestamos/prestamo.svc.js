(function(ng){
    var mod = ng.module('prestamosModule');
    
    mod.service('prestamosService', function($http){

        this.getReservasParaPrestamo = function() {
            return $http.get('https://bf43.herokuapp.com/api/reservasSinPrestamo/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }

    	this.getPrestamos = function() {
        	return $http.get('https://bf43.herokuapp.com/api/prestamos/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.getPrestamosUsuario = function(idUsuario) {
        	return $http.get('https://bf43.herokuapp.com/api/prestamos/', {params: {usuario: idUsuario}}).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.crearPrestamo = function(prestamo) {
            return $http.post('https://bf43.herokuapp.com/api/prestamos/', prestamo)
                    .success(function(response) {
                        console.log(response);
                        return response['data'];
                    })
                    .error(function(error) {
                        console.log(error)
                        return error;
                    });
        }

    	this.actualizarPrestamo = function(prestamo) {
        	return $http.put('https://bf43.herokuapp.com/api/prestamos/' + prestamo.id + "/", prestamo).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}

        this.asociarPrestamoAReserva = function(idPrestamo, reserva) {
            reserva.prestamo = idPrestamo;
            return $http.put('https://bf43.herokuapp.com/api/reservas/' + reserva.id + '/', reserva).then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }
   });
})(window.angular);
