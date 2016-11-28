(function (ng) {
    var mod = ng.module('reporteAdminModule');

    mod.controller('reporteAdminCtrl', ['reporteAdminService', '$modal', 'cookiesService', 'redireccionService',
                                    function (svc, $modal, cookiesSvc, redirect) {        
        
        this.bicisMantenimiento = function() {
            svc.getBicisMantenimiento().then(function(data) {
                this.numBicisMantenimiento = data.numeroBicicletasMantenimiento;
            }.bind(this));
        };

        this.bicisMasPrestadas = function() {
            svc.getBicisMasPrestadas().then(function(data) {
                this.tipoBiciMasPrestada = data[0].nombre;
            }.bind(this));
        };

        this.getNumUsuarios = function() {
            svc.getUsuarios().then(function(data) {
                this.numUsuarios = data.length;
            }.bind(this));
        };

        this.getNumMultas = function() {
            svc.getMultas().then(function(data) {
                this.numMultas = data.length;
            }.bind(this));
        };

        this.getNumerosPuntos = function () {
            svc.getNumerosPuntos().then(function(data) {
                this.puntos = data;
                if (this.puntos.length > 0){
                    this.pintarBarChart();
                }
            }.bind(this));
        };

        this.getPrestamosMes = function () {
            svc.getPrestamosMes().then(function(data) {
                this.prestamosMes = data;
                this.pintarAreaChart();
            }.bind(this));
        };

        this.getTrayectosPrestamos = function () {
            svc.getTrayectosPrestamos().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var dato = [];
                    dato.push(data[i].puntoOrigen);
                    dato.push(data[i].puntoDestino);
                    dato.push(data[i].cantidad);
                    this.trayectosPrestamos.push(dato);
                };
                if (this.trayectosPrestamos.length > 0){
                    this.pintarChordChart();
                }
            }.bind(this));
        };

        this.pintarBarChart = function () {
            $.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js',function(){
                $.getScript('http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.0/morris.min.js',function(){
                    
                    puntosChart = [];
                    for (var i = 0; i < this.puntos.length; i++) {
                        punto = {y:this.puntos[i].nombre, bicis:this.puntos[i].numeroBicicletas, prestamos:this.puntos[i].numeroPrestamos, multas:this.puntos[i].numeroMultas};
                        puntosChart.push(punto);
                    };

                    Morris.Bar({
                        element: 'puntos-barchart',
                        data: puntosChart,
                        xkey: 'y',
                        ykeys: ['bicis', 'prestamos', 'multas'],
                        labels: ['Bicicletas en punto', 'Préstamos', 'Multas']
                    });
                }.bind(this));
            }.bind(this));
        }

        this.pintarAreaChart = function() {
            $.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js',function(){
                $.getScript('http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.0/morris.min.js',function(){
                    
                    puntosChart = [];
                    for (var i = 0; i < this.prestamosMes.length; i++) {
                        punto = {y: this.prestamosMes[i].mes, prestamos: this.prestamosMes[i].cantidad};
                        puntosChart.push(punto);
                    };
                    Morris.Area({
                        element: 'prestamos-areachart',
                        data: puntosChart,
                        xkey: 'y',
                        parseTime: false,
                        ykeys: ['prestamos'],
                        labels: ['Prestamos']
                      });
                }.bind(this));
            }.bind(this));
        }

        this.pintarChordChart = function() {
            var data = this.trayectosPrestamos;
            var colores = this.generatePalette(this.puntos.length);
            var colors = {}
            var sortOrder = []
            var puntosPrestamo = this.puntos;
            //var puntosPrestamo = ["Punto1","Punto2","Punto3","Punto4"]
            for (var i = 0; i < puntosPrestamo.length; i++) {
                var nombre = puntosPrestamo[i].nombre + "";
                //var nombre = puntosPrestamo[i];
                sortOrder.push(nombre);
                colors[nombre] = colores[i];
            };
            function sort(a,b){ return d3.ascending(sortOrder.indexOf(a),sortOrder.indexOf(b)); }
            function valueFormat(x){ return (d3.format(",")(x));}

            var chi = viz.ch().data(data).padding(.05)
                  .source(d=>d[1])
                  .target(d=>d[0])
                  .sort(sort)
                  .valueFormat(valueFormat)
                  .fill(function(d){ return colors[d];});

            var che = viz.ch().data(data).padding(.05)
                  .sort(sort)
                  .valueFormat(valueFormat)
                  .fill(function(d){ return colors[d];});

            var width=1200, height=600;
            var svg = d3.select("#prestamos-chrodchart").append("svg").attr("height",height).attr("width",width);

            svg.append("g").attr("transform", "translate(300,300)").call(che);
            svg.append("g").attr("transform", "translate(900,300)").call(chi);

            svg.append("text").attr("x",300).attr("y",50).text("Salidas desde un punto").style("font-weight","bold")
            svg.append("text").attr("x",900).attr("y",50).text("Entradas a un punto").style("font-weight","bold")

            // adjust height of frame in bl.ocks.org
            d3.select(self.frameElement).style("height", height+"px").style("width", width+"px");
        }

        this.generatePalette = function(numColores){
            var variacion = 360/numColores;
            var puntoInicio = Math.floor(variacion);
            var colores = [];
            for (var i=0; i<numColores; i++){
                var x = (puntoInicio+variacion*i);
                var h = x/360;
                var rgb = hslToRgb(h, 0.5, 0.5);
                var r = Math.floor(rgb[0]);
                var g = Math.floor(rgb[1]);
                var b = Math.floor(rgb[2]);
                colores.push("rgb("+r+","+g+","+b+")");
            }
            return colores;
        }   

        function hslToRgb(h, s, l){
            var r, g, b;

            if(s == 0){
                r = g = b = l; // achromatic
            }else{
                function hue2rgb(p, q, t){
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return [r * 255, g * 255, b * 255];
        }

        

        this.irAUsuarios = function() {
            redirect.aUsuarios();
        };
        this.irABusquedaMultas = function() {
            redirect.aBusquedaMultas();
        };
        this.irABicis = function() {
            redirect.aBicis();
        };
        this.irATiposBici = function() {
            redirect.aTiposBici();
        };
        this.numBicisMantenimiento = 0;
        this.tipoBiciMasPrestada = "";
        this.numUsuarios = 0;
        this.numMultas = 0;
        this.puntos = [];
        this.prestamosMes = [];
        this.trayectosPrestamos = [];
        this.bicisMantenimiento();
        this.bicisMasPrestadas();
        this.getNumUsuarios();
        this.getNumMultas();
        this.getNumerosPuntos();
        this.getPrestamosMes();
        this.getTrayectosPrestamos();
   }]);
})(window.angular);


