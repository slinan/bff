(function(ng){
    var mod = ng.module('reviewModule');
    
    mod.service('reviewsService', function($http){

        this.crearReview = function(idPunto, review) {
            return $http.post('https://bf43.herokuapp.com/api/puntosPrestamo/' + idPunto + '/reviews/', review).then(
                function(response) {
                    console.log(response);
                    return response['data'];
                });
        };

        this.filtrarPuntos = function(calificacion) {
            return $http.get('https://bf43.herokuapp.com/api/puntosPrestamo/calificacion/' + calificacion + '/').then(
                function(response) {
                    console.log(response);
                    return response['data'];
                });
        };

   });
})(window.angular);


