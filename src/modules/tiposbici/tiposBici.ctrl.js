(function (ng) {
    var mod = ng.module('tiposBiciModule');

    mod.controller('tiposBiciCtrl', ['tiposBiciService', '$modal', 'cookiesService', 'confirmacionService',
                                    function (svc, $modal, cookiesSvc, confirmacion) {    	
    	
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
            confirmacion.showModal({}, this.opcionesEliminacion)
                .then(function (result) {
                    svc.eliminarTipoBici(item).then(function(data) {
                        this.refrescarTiposBici();
                    }.bind(this));
                }.bind(this));
        }

        this.tiposBici = [];
        this.opcionesEliminacion = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Eliminar',
            headerText: 'Confirmar Eliminación',
            bodyText: '¿Seguro que desea continuar? Se eliminarán las bicicletas asociadas.'
        };
    	this.refrescarTiposBici();
   }]);
})(window.angular);


