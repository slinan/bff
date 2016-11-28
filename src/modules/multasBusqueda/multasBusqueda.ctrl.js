(function (ng) {
    var mod = ng.module('multasBusquedaModule');

    mod.controller('multasBusquedaCtrl', ['multasBusquedaService', 'cookiesService', 'usuariosService', 'puntosPrestamoService', 'multasService',
                                    function (svc, cookiesSvc, usuarioSvc, puntosPrestamoSvc, multasSvc) {    	
    	

        this.refrescarUsuarios = function() {
            usuarioSvc.getUsuarios().then(function(data) {
                this.usuarios = [];
                for(var i = 0 ; i < data.length ; i++) {
                    //if(!data[i].is_superuser) {
                        this.usuarios.push(data[i]);
                    //}
                }
                this.usuariosPorId = {};
                for(var i = 0 ; i < this.usuarios.length ; i++) {
                    var usuario = this.usuarios[i];
                    this.usuariosPorId[usuario.id] = usuario;
                }
                this.usuarioABuscar = this.usuarios.length && this.usuarios[0];
            }.bind(this));
        };

        this.refrescarPuntosPrestamo = function() {
            puntosPrestamoSvc.getPuntosPrestamo().then(function(data) {
                this.puntosPrestamo = data;
                this.puntoABuscar = this.puntosPrestamo.length && this.puntosPrestamo[0];
            }.bind(this));
        };

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

        this.buscar = function() {
            if(this.buscarPor == this.opcionesBusqueda[0]) {
                svc.getMultasPunto(this.puntoABuscar.id).then(function(data) {
                    this.multas = data;
                }.bind(this))
            } else if(this.buscarPor == this.opcionesBusqueda[1]) {
                svc.getMultasUsuario(this.usuarioABuscar.id).then(function(data) {
                    this.multas = data;
                }.bind(this))
            }
        };

        this.getTipoInfraccion = function(idTipo) {
            return this.tiposMultaPorId[idTipo].tipo;
        }

        this.getUsuario = function(idUsuario) {
            return this.usuariosPorId[idUsuario].username;
        }

        this.opcionesBusqueda = ['Punto de préstamo', 'Usuario'];
        this.buscarPor = this.opcionesBusqueda[0];
        this.puntosPrestamo = [];
        this.usuarios = [];
        this.usuariosPorId = {};
        this.tiposMulta = [];
        this.tiposMultaPorId = {};
        this.multas = [];
        this.refrescarPuntosPrestamo();
        this.refrescarUsuarios();
        this.refrescarTiposMulta();
   }]);
})(window.angular);


