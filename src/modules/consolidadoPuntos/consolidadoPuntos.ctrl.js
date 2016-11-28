(function (ng) {
    var mod = ng.module('consolidadoPuntosModule');

    mod.controller('consolidadoPuntosCtrl', ['consolidadoPuntosService', '$modal', 'cookiesService', 'confirmacionService', 'usuariosService',
                                    function (svc, $modal, cookiesSvc, confirmacion, usuariosSvc) {        
        
        this.refrescarUsuarios = function() {
            usuariosSvc.getUsuarios().then(function(data) {
                this.usuarios = data;
            }.bind(this));
        };

        this.consolidarPuntos = function(user_id) {
            svc.consolidarPuntosUsuario(user_id).then(function(data) {
                this.confirmarConsolidacion.bodyText = 'Se han consolidado los puntos éxitosamente.\n';
                if (data.penalidad){
                    this.confirmarConsolidacion.bodyText += data.penalidad.descripcion;
                }
                else if (data.bono){
                    this.confirmarConsolidacion.bodyText += "Se genero un bono por valor de ";
                    + data.bono.monto + " pesos.";
                }
                else{
                    this.confirmarConsolidacion.bodyText += "Los puntos acumulados no generaron ni bono ni penalidad.";
                }

                this.confirmarConsolidacion.bodyText += '\n\nLos puntos consolidados fueron:\n';
                for (var i = 0; i < data.registrosPuntos.length; i++) {
                    var registro = data.registrosPuntos[i];
                    this.confirmarConsolidacion.bodyText += registro.puntos + ' por ' + registro.razon.toLowerCase() + ' en la fecha ' + registro.fecha + '\n';
                };

                confirmacion.showModal({}, this.confirmarConsolidacion)
                    .then(function (result) {
                        this.refrescarUsuarios();
                    }.bind(this));
                
            }.bind(this));
        };

        this.usuarios = [];
        this.refrescarUsuarios();
        this.confirmarConsolidacion = {
            closeButtonText: '',
            actionButtonText: 'OK',
            headerText: 'Puntos consolidados',
            bodyText: 'Se han consolidado los puntos éxitosamente.'
        };
   }]);
})(window.angular);


