(function (ng) {

    var mod = ng.module('confirmacionModule');

    mod.service('confirmacionService', ['$modal', function ($modal) {      
        
        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
            console.log("Papaya")
            console.log(tempModalDefaults)
            console.log(this.modalDefaults)
            console.log(customModalDefaults)
            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, this.modalOptions, customModalOptions);
            console.log("Papaya")
            console.log(tempModalOptions)
            console.log(this.modalOptions)
            console.log(customModalOptions)

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                };
            }
            tempModalDefaults.windowClass = 'app-modal-window';

            return $modal.open(tempModalDefaults).result;
        };

        this.modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'src/modules/confirmacion/confirmacion.tpl.html'
        };

        this.modalOptions = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'OK',
            headerText: 'Confirmar',
            bodyText: '¿Continuar?'
        };
    }]);
})(window.angular);
