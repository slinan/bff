(function (ng) {
	
    var mod = ng.module('redireccionModule', []);
    
    mod.constant('redireccionConstants', {
		'HOME': '/home',
		'LOGIN': '/login',
		'REGISTRO': '/registro',
		'TIPOS_BICI': '/tiposBici',
		'TIPOS_MULTA': '/multas',
		'PUNTOS_PRESTAMO': '/puntosPrestamo',
		'USUARIOS': '/usuarios', 
		'HACER_RESERVA': '/reservas',
		'CREAR_PRESTAMO': '/prestamos',
		'PRESTAMOS_USUARIO': '/prestamos-usuario',
		'BICIS': '/bicis',
		'REVIEWS': '/reviews',
		'RETORNOS': '/retornos',
		'REPORTE': '/reporteUsuario',
    });

})(window.angular);
