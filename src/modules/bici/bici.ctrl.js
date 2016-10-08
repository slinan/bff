(function (ng) {
    var mod = ng.module('bicisModule');

    mod.controller('bicisCtrl', ['bicisService', 'tiposBiciService', 'puntosPrestamoService', '$modal', 'confirmacionService',
                                    function (svc, tiposBiciSvc, puntosPrestamoSvc, $modal, confirmacion) {    	
    	
        this.nuevaBici = function() {
            this.abrirItem({tipo: this.tiposBici[0], puntoPrestamo: this.puntosPrestamo[0]}, this.tiposBici, this.puntosPrestamo);
        }

        this.abrirItem = function(bici, tiposBici, puntosPrestamo) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/bici/item/biciItem.tpl.html',
                controller: 'bicisItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        bici: function() {
                            return {id: bici.id, tipo: bici.tipo, puntoPrestamo: bici.puntoPrestamo};
                        },
                        tiposBici: function() {
                            return tiposBici;
                        },
                        puntosPrestamo: function() {
                            return puntosPrestamo;
                        }
                }   
            });

            modalInstance.result.then(function(infoBici) {
                if(!infoBici.id) {
                    svc.crearBici(infoBici).then(
                        function(data) {
                            this.refrescarBicis();
                        }.bind(this));
                } else {
                    svc.actualizarBici(infoBici).then(
                        function(data) {
                            this.refrescarBicis();
                        }.bind(this));
                }
            }.bind(this));
        };

    	this.refrescarBicis = function() {
    		svc.getBicis().then(function(data) {
    			this.bicis = data;
    		}.bind(this));
    	};

        this.refrescarPuntosPrestamo = function() {
            puntosPrestamoSvc.getPuntosPrestamo().then(function(data) {
                for (var i = 0 ; i < data.length ; i++) {
                    this.puntosPrestamo[data[i].id] = data[i];
                }
            }.bind(this));
        };

        this.refrescarTiposBici = function() {
            tiposBiciSvc.getTiposBici().then(function(data) {
                for (var i = 0 ; i < data.length ; i++) {
                    this.tiposBici[data[i].id] = data[i];
                }
            }.bind(this));
        };

        this.eliminarItem = function(item) {
            confirmacion.showModal({}, this.opcionesEliminacion)
                .then(function (result) {
                    svc.eliminarBici(item).then(function(data) {
                        this.refrescarBicis();
                    }.bind(this));
                }.bind(this));
        }

        this.bicis = [];
        this.puntosPrestamo = {};
        this.tiposBici = {};
        this.opcionesEliminacion = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Eliminar',
            headerText: 'Confirmar Eliminación',
            bodyText: '¿Seguro que desea continuar? Se eliminarán las reservas y préstamos asociados a esta bicicleta.'
        };
    	this.refrescarBicis();
        this.refrescarPuntosPrestamo();
        this.refrescarTiposBici();
   }]);
})(window.angular);


