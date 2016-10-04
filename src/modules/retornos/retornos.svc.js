(function(ng){
    var mod = ng.module('retornosModule');
    
    mod.service('retornosService', function($http){

        this.getPrestamosSinRetorno = function() {
            return $http.get('https://bf42.herokuapp.com/api/prestamosSinRetorno/').then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }

        this.crearRetorno = function(retorno) {
            return $http.post('https://bf42.herokuapp.com/api/retornar/', retorno).then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }

        this.asociarRetornoAPrestamo = function(idRetorno, prestamo) {
            prestamo.retorno = idRetorno;
            return $http.put('https://bf42.herokuapp.com/api/prestamos/' + prestamo.id + '/', prestamo).then(
                    function(response) {
                        console.log(response);
                        return response['data'];
                    });
        }

   });
})(window.angular);
