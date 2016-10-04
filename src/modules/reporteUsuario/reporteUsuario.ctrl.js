(function (ng) {
    var mod = ng.module('reporteUsuarioModule');

    mod.controller('reporteUsuarioCtrl', ['reporteUsuarioService', '$modal', 'cookiesService', 'puntosPrestamoService', 'tiposBiciService',
                                    function (svc, $modal, cookiesSvc, puntosPrestamoSvc, tiposBiciSvc) {        
        
        this.refrescarPuntos = function() {
            svc.getPuntosUsuario(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.puntos = data;
                console.log(this.puntos[0].punto.nombre);
            }.bind(this));
        };
    
        this.refrescarHorario = function() {
            svc.getHorariosUsuario(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.horarios = data;
            }.bind(this));
        };

       

       this.refrescarRutas = function() {
            svc.getRutas(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.rutas = data;
                console.log(this.rutas);
            }.bind(this));
        };
            
        this.refrescarTiempo = function() {
            svc.getTiempo(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.tiempos = data;
                console.log(this.rutas);
            }.bind(this));
        };
                                        
       

        this.now = new Date();
        this.now.setSeconds(0);
        this.maxTime = new Date(this.now)
        this.maxTime.setHours(this.now.getHours()+2);
        this.busqueda = {};
        this.busqueda.dateTime = new Date();
        this.busqueda.dateTime.setSeconds(0);
        this.busqueda.dateTime.setMilliseconds(0);
        this.puntos = [];
        this.horarios = [];
        this.tiempos = [];
        this.rutas = [];
        this.refrescarPuntos();
        this.refrescarTiempo();
        this.refrescarHorario();
        this.refrescarRutas();
   }]);
})(window.angular);


