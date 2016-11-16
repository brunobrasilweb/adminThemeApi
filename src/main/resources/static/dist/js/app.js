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

function run($rootScope, $location, $cookieStore, $http) {
    // Manter usuário logado quando atualizar a página
    $rootScope.globals = $cookieStore.get('globals') || {};
    $rootScope.urlApi = "http://localhost:8080";
    
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirecionar para o login quando não tiver logado
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $rootScope.globals.currentUser;

        $rootScope.pageCurrent = $location.path();

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
    
}