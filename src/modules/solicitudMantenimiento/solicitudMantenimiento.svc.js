(function(ng){
    var mod = ng.module('solicitudMantenimientoModule');
    
    mod.service('solicitudMantenimientoService', function($http){

    	this.getSolicitudes = function() {
        	return $http.get('https://bf43.herokuapp.com/api/danios/').then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	};

    	this.nuevaSolicitud = function(solicitud) {
        	return $http.post('https://bf43.herokuapp.com/api/danios/', solicitud).then(
        			function(response) {
        				console.log(response);
        				return response['data'];
            		});
    	}
   });
})(window.angular);
