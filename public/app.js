(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config);
        // .run(run);

    function config($stateProvider, $urlRouterProvider) {

        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                component: "home"
            })
            .state('submit', {
                url: '/thanks',
                templateUrl: 'components/views/thanks/thanks.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'components/views/about/about.html'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'components/views/products/products.html'
            })
            .state('store', {
                url: '/store',
                templateUrl: 'components/views/store/store.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                component: "dashboard",
                resolve: {
                    authenticated: checkAuthentication
                }
            })
            // .state('account', {
            //     url: '/account',
            //     component: "account"
            // })
            .state('login', {
                url: '/login',
                // templateUrl: 'components/views/login/login.html'
                component: "login"
            })
            .state('register', {
                url: '/register',
                // templateUrl: 'components/register/register.html'
                component: "register"
            });

            var checkAuthentication = function($q, $timeout, $http, $state, $rootScope) {
                var deferred = $q.defer();
              
                $http.get('/loggedin').success(function(user) {
                  $rootScope.errorMessage = null;
                  //User is Authenticated
                  if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                  } else { //User is not Authenticated
                    $rootScope.errorMessage = 'You need to log in';
                    deferred.reject();
                    $state.go('/login');
                  }
                });
                return deferred.promise;
            }
    }

    // function run($http, $rootScope, $window) {
    //     // add JWT token as default auth header
    //     $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
   
    // }

    // manually bootstrap angular after the JWT token is retrieved from the server
    // $(function () {
    //     // get JWT token from server
    //     $.get('/token', function (token) {
    //         window.jwtToken = token;

    //         angular.bootstrap(document, ['public']);
    //     });
    // });
})();