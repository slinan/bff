(function (ng) {
    var mod = ng.module('multasBusquedaModule');

    mod.controller('multasBusquedaUsuarioCtrl', ['multasBusquedaService', 'cookiesService', 'usuariosService', 'puntosPrestamoService', 'multasService',
                                    function (svc, cookiesSvc, usuarioSvc, puntosPrestamoSvc, multasSvc) {    	
    	

        this.refrescarTiposMulta = function() {
            multasSvc.getMultas().then(function(data) {
                this.tiposMulta = data;
                this.tiposMultaPorId = {};
                for(var i = 0 ; i < this.tiposMulta.length ; i++) {
                    var tipo = this.tiposMulta[i];
                    this.tiposMultaPorId[tipo.id] = tipo;
                }
            }.bind(this));
        };

        this.refrescarMultas = function() {
                svc.getMisMultas().then(function(data) {
                    this.multas = data;
                }.bind(this))
        }

        this.getTipoInfraccion = function(idTipo) {
            return this.tiposMultaPorId[idTipo].tipo;
        }

        this.getValor = function(idTipo) {
            return this.tiposMultaPorId[idTipo].monto;
        }

        this.tiposMulta = [];
        this.tiposMultaPorId = {};
        this.multas = [];
        this.refrescarTiposMulta();
        this.refrescarMultas();
   }]);
})(window.angular);


