(function (ng) {
    var mod = ng.module('puntosPrestamoModule');

    mod.controller('puntosPrestamoCtrl', ['puntosPrestamoService', '$modal', 'cookiesService', 'confirmacionService',
                                    function (svc, $modal, cookiesSvc, confirmacion) {        
        
        this.nuevoPuntoPrestamo = function() {
            this.abrirItem({nombre: "", direccion: ""});
        }

        this.abrirItem = function(puntoPrestamo) {
            if (!!puntoPrestamo.id){
                svc.getBicicletasEnPunto(puntoPrestamo.id).then(function(data){
                    this.abrirModal(puntoPrestamo, data)
                }.bind(this));
            }
            else{
                this.abrirModal(puntoPrestamo);
            }
        };

        this.abrirModal = function(puntoPrestamo, data){
            var modalInstance = $modal.open({
                    templateUrl: 'src/modules/puntosPrestamo/item/puntosPrestamoItem.tpl.html',
                    controller: 'puntosPrestamoItemCtrl',
                    controllerAs: 'ctrl',
                    resolve: {
                            puntoPrestamo: function() {
                                if (!!data){
                                    return {id: puntoPrestamo.id, nombre: puntoPrestamo.nombre, direccion: puntoPrestamo.direccion, tiposBicis: data};
                                } else {
                                    return {id: puntoPrestamo.id, nombre: puntoPrestamo.nombre, direccion: puntoPrestamo.direccion};
                                }
                            }
                    }   
                });

                modalInstance.result.then(function(infoPuntoPrestamo) {
                    console.log("info punto: " + infoPuntoPrestamo);
                    if(!infoPuntoPrestamo.id) {
                        svc.nuevoPuntoPrestamo(infoPuntoPrestamo).then(
                            function(data) {
                                this.refrescarPuntosPrestamo();
                            }.bind(this));
                    } else {
                        svc.actualizarPuntoPrestamo(infoPuntoPrestamo).then(
                            function(data) {
                                this.refrescarPuntosPrestamo();
                            }.bind(this));
                    }
                }.bind(this));
        }

        this.refrescarPuntosPrestamo = function() {
            svc.getPuntosPrestamo().then(function(data) {
                this.puntosPrestamo = data;
            }.bind(this));
        };

        this.eliminarItem = function(item) {
            confirmacion.showModal({}, this.opcionesEliminacion)
                .then(function (result) {
                    svc.eliminarPuntoPrestamo(item).then(function(data) {
                        this.refrescarPuntosPrestamo();
                    }.bind(this));
                }.bind(this));
        }
                
        this.puntosPrestamo = [];
        this.opcionesEliminacion = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Eliminar',
            headerText: 'Confirmar Eliminación',
            bodyText: '¿Seguro que desea continuar? Se eliminarán los reviews y bicicletas asociados (y los préstamos y reservas asociados a tales bicicletas).'
        };
        this.refrescarPuntosPrestamo();
   }]);
})(window.angular);


