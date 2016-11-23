angular
    .module('app', [
        'ngRoute', 
        'ui.bootstrap', 
        'ngCookies',
        'chart.js',
        'ckeditor',
        'ngAnimate',
        'cfp.loadingBar'
    ])
    .config(config)
    .run(run);

function config($routeProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {
    $routeProvider
        .when('/', {
            controller: 'DashboardController',
            templateUrl: 'tpl/dashboard.html'
        })
        .when('/404', {
            controller: 'ErrorPageController',
            templateUrl: 'tpl/404.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'tpl/users/login.html'
        })
        .when('/users/:page?', {
            controller: 'UsersController',
            templateUrl: 'tpl/users/list.html'
        })
        .otherwise({ redirectTo: '/' });

    cfpLoadingBarProvider.includeSpinner = true;

    $httpProvider.interceptors.push(function ($q, $rootScope, $cookieStore, $window) {
        return {
            request: function (config) {
                return config || $q.when(config)
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $cookieStore.remove('access_token');
                    $cookieStore.remove('expires_in');
                    $cookieStore.remove('refresh_token');
                    $cookieStore.remove('user');
                    $cookieStore.put('Authorization', 'Basic hj43jherje34');

                    $window.location.href = '/#/login';
                }
                return $q.reject(response);
            }
        };
    });

}

function run($rootScope, $location, $window, $cookieStore, $http, UsersService) {
    var authorization = $cookieStore.get('Authorization') || null;

    $rootScope.userLogged = $cookieStore.get("user") || null;
    $rootScope.apiUrl = "http://localhost:8080";
    $rootScope.apiClientId = "clientapp";
    $rootScope.apiClientSecret = "123456";
    $rootScope.apiScope = "read write";
    $rootScope.apiUrlOAuth = "http://" + $rootScope.apiClientId + ":" + $rootScope.apiClientSecret + "@localhost:8080/oauth/token";
    $rootScope.updateProfile = function(data) {
        UsersService.updateProfile(data).then(function(){
            $('#form-profile').modal('hide');
            noty({layout: 'topCenter', timeout: 2000, type: 'success', text: 'Seus dados foram salvo.'});
        });
    }
    $rootScope.logout = function() {
        UsersService.logout();
        $location.path('/login');
    }

    if (authorization) {
        $http.defaults.headers.common['Authorization'] = authorization;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirecionar para o login quando não tiver logado
        var authorization = $cookieStore.get('Authorization') || null;
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $cookieStore.get('access_token') || null;

        $rootScope.pageCurrent = $location.path();

        if (authorization) {
            $http.defaults.headers.common['Authorization'] = authorization;
        }

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });

}