angular
    .module('app', [
        'ngRoute', 
        'ui.bootstrap', 
        'ngCookies',
        'chart.js',
        'ckeditor',
    ])
    .config(config)
    .run(run);

function config($routeProvider, $httpProvider, $locationProvider) {
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
}

function run($rootScope, $location, $window, $cookieStore, $http, UsersService) {
    var apiToken = $cookieStore.get('access_token') || null;

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

    if (apiToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + apiToken;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirecionar para o login quando não tiver logado
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $cookieStore.get('access_token') || null;

        $rootScope.pageCurrent = $location.path();

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });

}