(function (ng) {
    var mod = ng.module('reservasModule');

    mod.controller('reservasCtrl', ['reservasService', '$modal', 'cookiesService', 'puntosPrestamoService', 'tiposBiciService', 'confirmacionService', 'puntosPrestamoService',
                                    function (svc, $modal, cookiesSvc, puntosPrestamoSvc, tiposBiciSvc, confirmacion) {        
        
        this.refrescarReservas = function() {
            svc.getReservasUsuario(cookiesSvc.getCookieDeAutorizacion().id).then(function(data) {
                this.reservas = data;
            }.bind(this));
        };

        this.refrescarPuntosPrestamo = function() {
            puntosPrestamoSvc.getPuntosPrestamo().then(function(data) {
                this.puntosPrestamo = data;
                if(this.puntosPrestamo.length > 0) {
                    this.busqueda.punto = this.puntosPrestamo[0];
                }
            }.bind(this));
        };

        this.refrescarTiposBici = function() {
            tiposBiciSvc.getTiposBici().then(function(data) {
                this.tiposBici = data;
                if(this.tiposBici.length > 0) {
                    this.busqueda.tipo = this.tiposBici[0];
                }
            }.bind(this));
        };

        this.refrescarBicisDisponibles = function() {
            if(this.getNow() <= this.busqueda.dateTime && this.busqueda.dateTime <= this.getMaxTime()){
                var busquedaServer = {
                    punto: this.busqueda.punto.id,
                    tipo: this.busqueda.tipo.id,
                    dateTime: this.busqueda.dateTime
                };
                console.log(busquedaServer);
                svc.getBicisDisponibles(busquedaServer).then(function(data) {
                    console.log()
                    var myData = [];
                    for(var i = 0 ; i < data.length ; i++) {
                        if(data[i].disponible) {
                            myData.push(data[i]);
                        }
                    }
                    this.bicisDisponibles = myData;
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
            this.reserva = {idBicicleta: bici_id, idUsuario: cookiesSvc.getCookieDeAutorizacion().id, dateTime: this.getNow()};
            svc.nuevaReserva(this.reserva).then(function(data) {
                confirmacion.showModal({}, this.confirmarReserva)
                    .then(function (result) {
                        this.bicisDisponibles = data;
                        this.refrescarReservas();
                    }.bind(this));
                
            }.bind(this));
        };

        this.getNow = function() {
            var now = new Date();
            now.setSeconds(0);
            now.setMilliseconds(0);
            return now;
        }

        this.getMaxTime = function() {
            var maxTime = new Date(this.getNow())
            maxTime.setHours(this.getNow().getHours()+2);
            return maxTime;
        }

        this.seleccionarPunto = function(marker, punto) {
            this.busqueda.punto = punto;
        }.bind(this)

        this.busqueda = {};
        this.busqueda.dateTime = this.getNow();
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


