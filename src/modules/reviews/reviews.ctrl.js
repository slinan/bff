(function (ng) {
    var mod = ng.module('reviewModule');

    mod.controller('reviewsCtrl', ['reviewsService', 'puntosPrestamoService', 'confirmacionService', '$modal',
                                    function (svc, puntosPrestamoSvc, confirmacion, $modal) {    	

        this.mostrarReviews = function(punto) {
            this.abrirModal(punto);
        };

        this.abrirModal = function(punto){
            var modalInstance = $modal.open({
                    templateUrl: 'src/modules/reviews/item/puntosPrestamoItem.tpl.html',
                    controller: 'puntosPrestamoReviewItemCtrl',
                    controllerAs: 'ctrl',
                    resolve: {
                            puntoPrestamo: function() {
                                return punto;
                            }
                    }   
                });

                modalInstance.result.then(function(review) {
                    svc.crearReview(punto.id, review).then(
                        function(data) {
                            confirmacion.showModal({}, this.opcionesConfirmacion)
                                .then(function (result) {
                                    this.refrescarPuntosPrestamo();
                                }.bind(this));
                        }.bind(this));
                }.bind(this));
        }

        this.refrescarPuntosPrestamo = function() {
            puntosPrestamoSvc.getPuntosPrestamo().then(function(data) {
                this.puntosPrestamo = data;
            }.bind(this));
        };

        this.filtrarPuntos = function() {
            if(typeof this.calificacion == "undefined" || this.calificacion == ""){
                this.refrescarPuntosPrestamo();
            } else {
                svc.filtrarPuntos(this.calificacion).then(
                    function(data){
                        this.mensajeVacio = data.length == 0 ? "No hay puntos de préstamo que cumplan con el filtro." : this.mensajeVacio;
                        this.puntosPrestamo = data;
                    }.bind(this));
            }
        };

        this.puntosPrestamo = [];
        this.mensajeVacio = "No hay puntos de préstamo en el momento.";
        this.opcionesConfirmacion = {
            closeButtonText: '',
            actionButtonText: 'Continuar',
            headerText: 'Comentario Creado',
            bodyText: 'El comentario ha sido creado.'
        };
        this.refrescarPuntosPrestamo();
   }]);
})(window.angular);


