(function (ng) {
    var mod = ng.module('usuariosModule');

    mod.controller('usuariosCtrl', ['usuariosService', '$modal', 'cookiesService', 'dateFilter',
                                    function (svc, $modal, cookiesSvc, dateFilter) {    	
    	
        this.nuevoUsuario = function() {
            console.log("Entra");
            this.abrirItem({tipoUsuario: "", nombre: "", fechaNacimiento: "", email: "", password: ""});
        }

        this.abrirItem = function(usuario) {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/usuarios/item/usuariosItem.tpl.html',
                controller: 'usuariosItemCtrl',
                controllerAs: 'ctrl',
                resolve: {
                        usuario: function() {
                            return {
                                id: usuario.id, 
                                tipoUsuario: usuario.tipoUsuario, 
                                nombre: usuario.nombre, 
                                fechaNacimiento: new Date (usuario.fechaNacimiento), 
                                email: usuario.email, 
                                password: usuario.password
                            };
                        }
                }   
            });

            modalInstance.result.then(function(usuario) {
                console.log(usuario);
                usuario.fechaNacimiento = dateFilter(usuario.fechaNacimiento, 'yyyy-MM-dd');
                if(!usuario.id) {
                    svc.nuevoUsuario(usuario).then(
                        function(data) {
                            this.refrescarUsuarios();
                        }.bind(this));
                } else {
                    svc.actualizarUsuario(usuario).then(
                        function(data) {
                            this.refrescarUsuarios();
                        }.bind(this));
                }
            }.bind(this));
        };

    	this.refrescarUsuarios = function() {
    		svc.getUsuarios().then(function(data) {
    			this.usuarios = data;
    		}.bind(this));
    	};

        this.eliminarItem = function(item) {
            svc.eliminarUsuario(item).then(function(data) {
                this.refrescarUsuarios();
            }.bind(this));
        }

        this.usuarios = [];
    	this.refrescarUsuarios();
   }]);
})(window.angular);


