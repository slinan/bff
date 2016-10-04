(function (ng) {
    var mod = ng.module('multasModule');

    mod.controller('multasCtrl', ['multasService', '$modal', 'cookiesService', 'confirmacionService',
                                    function (svc, $modal, cookiesSvc, confirmacion) {    	
    	
        this.nuevoMulta = function() {
            console.log("Entra");
            this.abrirItem({tipo: "", monto: 0.00});
        }

        this.abrirItem = function(multa) {
            console.log(multa.monto)
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/multas/item/multasItem.tpl.html',
                controller: 'multasItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        multa: function() {
                            return {id: multa.id, tipo: multa.tipo, monto: parseFloat(multa.monto)};
                        }
                }   
            });

            modalInstance.result.then(function(infoMulta) {
                console.log(infoMulta);
                if(!infoMulta.id) {
                    svc.nuevoMulta(infoMulta).then(
                        function(data) {
                            this.refrescarMultas();
                        }.bind(this));
                } else {
                    svc.actualizarMulta(infoMulta).then(
                        function(data) {
                            this.refrescarMultas();
                        }.bind(this));
                }
            }.bind(this));
        };

    	this.refrescarMultas = function() {
    		svc.getMultas().then(function(data) {
    			this.multas = data;
    		}.bind(this));
    	};

        this.eliminarItem = function(item) {
            confirmacion.showModal({}, this.opcionesEliminacion)
                .then(function (result) {
                    svc.eliminarMulta(item).then(function(data) {
                        this.refrescarMultas();
                    }.bind(this));
                }.bind(this));
        }

        this.multas = [];
        this.opcionesEliminacion = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Eliminar',
            headerText: 'Confirmar Eliminación',
            bodyText: '¿Seguro que desea continuar?'
        };
    	this.refrescarMultas();
   }]);
})(window.angular);


