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
                if(usuario.tipoUsuario=="Administrador") {
                    usuario.groups.push(2);
                }else if(usuario.tipoUsuario=="Funcionario"){
                    usuario.groups.push(1);
                }
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
            confirmacion.showModal({}, this.opcionesEliminacion)
                .then(function (result) {
                    if(cookiesSvc.getCookieDeAutorizacion().id != item.id) {
                        svc.eliminarUsuario(item).then(function(data) {
                            this.refrescarUsuarios();
                        }.bind(this));
                    }
                    else {
                        alert("¡POR FAVOR NO SE ELIMINE A USTED MISMO! ¡EL MUNDO SE VA A ACABAR!");
                    }
                }.bind(this));
        }

        this.usuarios = [];
        this.opcionesEliminacion = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Eliminar',
            headerText: 'Confirmar Eliminación',
            bodyText: '¿Seguro que desea continuar?'
        };
    	this.refrescarUsuarios();
   }]);
})(window.angular);


