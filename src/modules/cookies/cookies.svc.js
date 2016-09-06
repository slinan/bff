(function (ng) {

    var mod = ng.module('cookiesModule');

    mod.service('cookiesService', ['$cookies', function ($cookies) {    	
    	        
        this.crearCookieDeAutorizacion = function(data) {
        	this.borrarCookieDeAutorizacion();
        	$cookies.putObject(
            		this.nombreCookieDeAutorizacion, 
            		{
            			id: data.id,
            			rol: data.rol 
            		})
        };
                       
        this.getCookieDeAutorizacion = function() {
        	if(!this.cookieAutorizacion) {
        		this.cookieAutorizacion = 
        			$cookies.getObject(this.nombreCookieDeAutorizacion);
        	}
        	return this.cookieAutorizacion;
        }
        
        this.borrarCookieDeAutorizacion = function() {
            $cookies.remove(this.nombreCookieDeAutorizacion);
            this.cookieAutorizacion = undefined;
        };
        
    	this.nombreCookieDeAutorizacion = 'Bikes4Free';
    	this.cookieAutorizacion = undefined;
    }]);
})(window.angular);

