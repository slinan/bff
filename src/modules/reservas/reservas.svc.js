(function(ng){
    var mod = ng.module('reservasModule');
    
    mod.service('reservasService', function($http){

    	this.getReservasUsuario = function(user_id) {
        	return $http.get('https://bf43.herokuapp.com/api/reservas/?user=' + user_id + '&bicicleta=&fecha=&prestamo=&id=').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.nuevaReserva = function(reserva) {
        	return $http.post('https://bf43.herokuapp.com/api/reservar/', reserva).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

        this.getBicisDisponibles = function(params) {
            return $http.post('https://bf43.herokuapp.com/api/bicisDisponibles/', params).then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        };
   });
})(window.angular);
