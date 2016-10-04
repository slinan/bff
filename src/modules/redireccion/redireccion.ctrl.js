(function (ng) {
    var mod = ng.module('redireccionModule');

    mod.controller('redireccionCtrl', ['redireccionService',
                                   		function (redirect) {
    	
    	this.aHome = function() {
        	redirect.aHome();
    	};
    	
    	this.aLogin = function() {
        	redirect.aLogin();
    	};

        this.aRegistro = function() {
            redirect.aRegistro();
        };
        
   }]);
})(window.angular);
