(function (ng) {
    var mod = ng.module('tiposBiciModule');

    mod.controller('tiposBiciCtrl', ['tiposBiciService', '$modal', 'cookiesService',
                                    function (svc, $modal, cookiesSvc) {    	
    	
        this.nuevoTipoBici = function() {
            this.abrirItem({nombre: ""});
        }

        this.abrirItem = function(tipoBici) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/tiposbici/item/tiposBiciItem.tpl.html',
                controller: 'tiposBiciItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        tipoBici: function() {
                            return {id: tipoBici.id, nombre: tipoBici.nombre};
                        }
                }   
            });

            modalInstance.result.then(function(infoTipoBici) {
                console.log(infoTipoBici);
                if(!infoTipoBici.id) {
                    svc.nuevoTipoBici(infoTipoBici).then(
                        function(data) {
                            this.refrescarTiposBici();
                        }.bind(this));
                } else {
                    svc.actualizarTipoBici(infoTipoBici).then(
                        function(data) {
                            this.refrescarTiposBici();
                        }.bind(this));
                }
            }.bind(this));
        };

    	this.refrescarTiposBici = function() {
    		svc.getTiposBici().then(function(data) {
    			this.tiposBici = data;
    		}.bind(this));
    	};

        this.eliminarItem = function(item) {
            svc.eliminarTipoBici(item).then(function(data) {
                this.refrescarTiposBici();
            }.bind(this));
        }

        this.tiposBici = [];
    	this.refrescarTiposBici();
   }]);
})(window.angular);


