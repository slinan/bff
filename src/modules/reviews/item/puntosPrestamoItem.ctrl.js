(function (ng) {
    var mod = ng.module('reviewModule');

    mod.controller('puntosPrestamoReviewItemCtrl', ['$modalInstance', 'puntoPrestamo', 
                                     function ($modalInstance, puntoPrestamo) {
    	
        this.guardar = function() {
            var review = this.newReview;
            if(!review.comentario) {
                this.error = "Debe escribirse un comentario.";
            } else {
                this.error = null;
                console.log(review);
                $modalInstance.close(review);
            }
    	};

        this.cambiarCalificacion = function (calificacion) {
            this.newReview.calificacion = calificacion;
        }

    	this.cerrar = function() {
    	  $modalInstance.dismiss();
    	};
    	
    	this.puntoPrestamo = puntoPrestamo;
        this.error = null;
        this.newReview = {calificacion: 5, comentario: null};
   }]);
})(window.angular);
