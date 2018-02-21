(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config);
        // .run(run);

    function config($stateProvider, $urlRouterProvider) {

        var authenticated = ['$q', 'AuthService', function ($q, AuthService) {
            var deferred = $q.defer();
            var isLoggedIn = AuthService.isLoggedIn()
            if (isLoggedIn === true) {
                deferred.resolve();
            } else {
                alert('Not logged in')
                deferred.reject('Not logged in');
            }
            return deferred.promise;
        }];


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
                    authenticated: authenticated
                }
            })
            // .state('account', {
            //     url: '/account',
            //     component: "account"
            // })
            .state('login', {
                url: '/login',
                templateUrl: 'components/views/login/login.html'
            });
            // .state('register', {
            //     url: '/login',
            //     templateUrl: 'components/register/register.html'
            // });
        
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