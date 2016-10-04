(function(ng){
    var mod = ng.module('authModule');
    
    mod.directive('authBar',[function(){
        return {
            scope:{},
            restrict: 'E',
            templateUrl: 'src/modules/auth/authBar.tpl.html',
            controller: 'authCtrl',
            controllerAs: "ctrl"
        };                    
    }]);
})(window.angular);