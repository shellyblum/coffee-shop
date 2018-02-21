angular
    .module('app')
    .factory('AuthService', ['$window', function ($window) {
        var factory = {};

        factory.isLoggedIn = function () {
            var isLoggedIn = angular.fromJson($window.sessionStorage.getItem("user"))
            var response;
            isLoggedIn !== null ? response = true : response = false;
            console.log(response)
            return response;
        };
        
        return factory;

}]);