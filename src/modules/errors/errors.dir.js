(function(ng){
    var mod = ng.module('errorsModule');
    
    mod.directive('errors',[function(){
        return {
            restrict: 'E',
            scope: {
              error: '=',
            },
            templateUrl: 'src/modules/errors/errors.tpl.html'
        };                    
    }]);
    
    mod.directive('jumbotron',[function(){
        return {
            restrict: 'E',
            scope: {
            	header: '@header',
                mensaje: '@mensaje',
                accion: '@accion'
            },
            templateUrl: 'src/modules/errors/jumbotron.tpl.html'
        };                    
    }]);
})(window.angular);