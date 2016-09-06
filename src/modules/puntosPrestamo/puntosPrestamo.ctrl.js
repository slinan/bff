(function (ng) {
    var mod = ng.module('puntosPrestamoModule');

    mod.controller('puntosPrestamoCtrl', ['puntosPrestamoService', '$modal', 'cookiesService',
                                    function (svc, $modal, cookiesSvc) {        
        
        this.nuevoPuntoPrestamo = function() {
            console.log("Entra");
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
            svc.eliminarPuntoPrestamo(item).then(function(data) {
                this.refrescarPuntosPrestamo();
            }.bind(this));
        }
                
        this.puntosPrestamo = [];
        this.refrescarPuntosPrestamo();
   }]);
})(window.angular);


