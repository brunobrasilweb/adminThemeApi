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
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'tpl/users/login.html'
        })
        .when('/users/:page?', {
            controller: 'UsersController',
            templateUrl: 'tpl/users/list.html'
        })
        .otherwise({ redirectTo: '/login' });
}

function run($rootScope, $location, $window, $cookieStore, $http, UsersService) {
    // Manter usuário logado quando atualizar a página
    $rootScope.accessToken = $cookieStore.get('access_token') || null;
    console.log("accessToken: " + $rootScope.accessToken);
    $rootScope.userLogged = $cookieStore.get('userLogged') || {};
    $rootScope.apiUrl = "http://localhost:8080";
    $rootScope.apiClientId = "clientapp";
    $rootScope.apiClientSecret = "123456";
    $rootScope.apiScope = "read write";
    $rootScope.apiUrlOAuth = "http://" + $rootScope.apiClientId + ":" + $rootScope.apiClientSecret + "@localhost:8080/oauth/token";
    $rootScope.logout = function() {
        UsersService.logout();
        $window.location.href = '/';
    }

    if ($rootScope.accessToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.accessToken;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirecionar para o login quando não tiver logado
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $rootScope.accessToken;

        $rootScope.pageCurrent = $location.path();

        if ($rootScope.pageCurrent != "/login" && loggedIn) {
            UsersService.refreshToken();
        }

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });

}