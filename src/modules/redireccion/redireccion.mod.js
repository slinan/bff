(function (ng) {
	
    var mod = ng.module('redireccionModule', []);
    
    mod.constant('redireccionConstants', {
		'HOME': '/home',
		'LOGIN': '/login',
		'REGISTRO': '/registro',
		'TIPOS_BICI': '/tiposBici',
		'TIPOS_MULTA': '/multas',
		'PUNTOS_PRESTAMO': '/puntosPrestamo',
		'USUARIOS': '/usuarios'
    });

})(window.angular);
