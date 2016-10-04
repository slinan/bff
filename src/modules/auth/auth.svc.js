(function (ng) {

    var mod = ng.module('authModule');

    mod.service('authService', ['$http', 'cookiesService',
                                function ($http, cookiesSvc) {  

       	this.login = function(usuario) {
        	return $http.post('https://bf42.herokuapp.com/api/getToken/', usuario)
            .success(function(response) {
        		return response['data'];
            }).error(function (httpObj, textStatus) {
                return {error: textStatus};
            });
    	};  	
    	        
    }]);
})(window.angular);

