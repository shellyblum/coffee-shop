angular
    .module('app')
    .component("register", {
        templateUrl: "./components/views/register/register.html",
        controller: controller });
        
        function controller ($state, $http, $rootScope) {
            var self = this;
            // self.user = {};

            $scope.signup = function(user) {
  
                if (user.password == user.password2) {
                  $http.post('/signup', user)
                    .success(function(user) {
                      $rootScope.currentUser = user;
                      $state.go('dashboard');                  
                    });
                }
            }
        }

