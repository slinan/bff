(function (ng) {
    var mod = ng.module('usuariosModule');

    mod.controller('usuariosCtrl', ['usuariosService', '$modal', 'cookiesService', 'dateFilter', 'confirmacionService',
                                    function (svc, $modal, cookiesSvc, dateFilter, confirmacion) {    	
    	
        this.nuevoUsuario = function() {
            console.log("Entra");
            this.abrirItem({tipoUsuario: "", username:"", first_name: "", last_name:"",  email: "", password: ""});
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
                                groups: usuario.groups,
                                tipoUsuario: usuario.tipoUsuario == "" ? usuario.tipoUsuario : (usuario.groups.indexOf(2)!=-1 ? "Administrador" : (usuario.groups.indexOf(1)!=-1 ? "Funcionario" : "Usuario")), 
                                username: usuario.username,
                                first_name: usuario.first_name,
                                last_name: usuario.last_name, 
                                email: usuario.email,
                                password: usuario.password
                            };
                        }
                }   
            });

            modalInstance.result.then(function(usuario) {
                console.log(usuario);
                usuario.groups=[];
                if(!usuario.id) {
                    if(usuario.tipoUsuario=="Administrador") {
                        svc.nuevoUsuario(usuario).then(
                            function(data) {
                                svc.volverAdmin(data).then(
                                    function(data) {
                                        this.refrescarUsuarios();
                                    }.bind(this));
                            }.bind(this));
                    } else if (usuario.tipoUsuario=="Funcionario") {
                        svc.nuevoUsuario(usuario).then(
                            function(data) {
                                svc.volverFuncionario(data).then(
                                    function(data) {
                                        this.refrescarUsuarios();
                                    }.bind(this));
                            }.bind(this));
                    } else {
                        svc.nuevoUsuario(usuario).then(
                            function(data) {
                                this.refrescarUsuarios();
                            }.bind(this));
                    }
                    
                } else {
                    if(usuario.tipoUsuario=="Administrador") {
                        usuario.groups.push(2);
                    }else if(usuario.tipoUsuario=="Funcionario"){
                        usuario.groups.push(1);
                    }
                    svc.actualizarUsuario(usuario).success(
                        function(data) {
                            this.error = {
                                status: false
                            };
                            this.refrescarUsuarios();
                        }.bind(this)).error(
                        function(data) {
                            this.error = {
                                status: true,
                                encabezado: 'Error',
                                tipo: 'danger',
                                mensaje: 'No fue posible editar el usuario. El username ingresado ya se encuentra registrado.',                  
                            }
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
            confirmacion.showModal({}, this.opcionesEliminacion)
                .then(function (result) {
                    svc.eliminarUsuario(item).then(function(data) {
                        this.refrescarUsuarios();
                    }.bind(this));
                }.bind(this));
        }

        this.esUsuarioActivo = function(user) {
            if (typeof(cookiesSvc.getCookieDeAutorizacion()) != 'undefined'){
                return (cookiesSvc.getCookieDeAutorizacion().id == user.id);
            } else {
                return false;
            }
        }

        this.error = {
            status: false
        };
        this.usuarios = [];
        this.opcionesEliminacion = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Eliminar',
            headerText: 'Confirmar Eliminación',
            bodyText: '¿Seguro que desea continuar? Se eliminará toda la información asociada a este usuario (préstamos, reservas, retornos, reviews y multas)'
        };
    	this.refrescarUsuarios();
   }]);
})(window.angular);


