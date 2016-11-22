angular.module('app').controller('LoginController', LoginController);

function LoginController($scope, $http, $location, $window, $rootScope, UsersService) {
    $rootScope.title = "Login";

    (function() {
        if ($rootScope.accessToken) {
            console.log("tem token");
            return $location.path('/');
        }
    })();
    
    $scope.login = function(username, password) {
        $scope.dataLoading = true;
        UsersService.login(username, password).then(function (data) {
            if (data.access_token) {
                $location.path('/');
            } else {
                noty({layout: 'topCenter', timeout: 2000, type: 'error', text: 'Não foi possível fazer o login. Verifique seu login e senha.'});
                $scope.dataLoading = false;
            }
        });
    };
}