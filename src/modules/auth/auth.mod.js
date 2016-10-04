(function (ng) {
	
    var mod = ng.module('authModule', []);
    
    mod.constant('authConstants', {
		'LOGIN': '/login',
		'REGISTRO': '/usuario',
		'HOME': '/producto',
		'FORBIDDEN': '/forbidden',
		'REGISTRO_EXITOSO': '/registro-exitoso',
		'TIMEOUT': '/timeout',
		'CAMBIAR_CONTRASENIA': '/cambiar-contrasenia'
    });

})(window.angular);
