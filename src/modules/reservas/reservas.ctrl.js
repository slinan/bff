(function (ng) {
    var mod = ng.module('reservasModule');

    mod.controller('reservasCtrl', ['reservasService', '$modal', 'cookiesService', 'puntosPrestamoService', 'tiposBiciService', 'confirmacionService',
                                    function (svc, $modal, cookiesSvc, puntosPrestamoSvc, tiposBiciSvc, confirmacion) {        
        
        this.refrescarReservas = function() {
            svc.getReservasUsuario(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.reservas = data;
            }.bind(this));
        };

        this.refrescarPuntosPrestamo = function() {
            puntosPrestamoSvc.getPuntosPrestamo().then(function(data) {
                this.puntosPrestamo = data;
            }.bind(this));
        };

        this.refrescarTiposBici = function() {
            tiposBiciSvc.getTiposBici().then(function(data) {
                this.tiposBici = data;
            }.bind(this));
        };

        this.refrescarBicisDisponibles = function() {
            if(this.now <= this.busqueda.dateTime && this.busqueda.dateTime <= this.maxTime){
                svc.getBicisDisponibles(this.busqueda).then(function(data) {
                    this.bicisDisponibles = data;
                }.bind(this));
            }
            else{
                this.error = {
                        status: true,
                        encabezado: 'Error',
                        tipo: 'danger',
                        mensaje: 'No puede reservar con más de 2 horas de antelación (o para una hora que ya pasó)'                  
                };
                this.bicisDisponibles = [];
            }
        };

        this.reservar = function(bici_id) {
            this.reserva = {idBicicleta: bici_id, idUsuario: cookiesSvc.getCookieDeAutorizacion().id, dateTime: this.busqueda.dateTime};
            svc.nuevaReserva(this.reserva).then(function(data) {
                confirmacion.showModal({}, this.confirmarReserva)
                    .then(function (result) {
                        this.bicisDisponibles = data;
                        this.refrescarReservas();
                    }.bind(this));
                
            }.bind(this));
        };

        this.now = new Date();
        this.now.setSeconds(0);
        this.now.setMilliseconds(0);
        this.maxTime = new Date(this.now)
        this.maxTime.setHours(this.now.getHours()+2);
        this.busqueda = {};
        this.busqueda.dateTime = this.now;
        this.reservas = [];
        this.puntosPrestamo = [];
        this.tiposBici = [];
        this.bicisDisponibles = [];
        this.refrescarReservas();
        this.refrescarPuntosPrestamo();
        this.refrescarTiposBici();
        this.error = {
            status: false
        };
        this.confirmarReserva = {
            closeButtonText: '',
            actionButtonText: 'OK',
            headerText: 'Reserva creada',
            bodyText: 'Se ha registrado la reserva éxitosamente.'
        };
   }]);
})(window.angular);


