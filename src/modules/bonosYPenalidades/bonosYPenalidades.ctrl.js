(function (ng) {
    var mod = ng.module('bonosYPenalidadesModule');

    mod.controller('bonosYPenalidadesCtrl', ['bonosYPenalidadesService', '$modal', 'cookiesService',
                                    function (svc, $modal, cookiesSvc) {    	

    	this.refrescarBonos = function() {
    		svc.getBonos(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
    			this.bonos = data;
    		}.bind(this));
    	};

        this.refrescarPenalidades = function() {
            svc.getPenalidades(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.penalidades = data;
            }.bind(this));
        };

        this.bonos = [];
        this.penalidades = [];
        this.refrescarBonos();
        this.refrescarPenalidades();
   }]);
})(window.angular);


