angular.module('app').controller('LoginController', LoginController);

function LoginController($scope, $window, $rootScope, UsersService) {
    $rootScope.title = "Login";

    (function() {
        if ($rootScope.accessToken) {
            console.log("tem token");
            return $window.location.href = '/';
        }
    })();
    
    $scope.login = function(username, password) {
        $scope.dataLoading = true;
        UsersService.login(username, password).then(function (data) {
            if (data.access_token) {
                $window.location.href = '/';
            } else {
                noty({layout: 'topCenter', timeout: 2000, type: 'error', text: 'Não foi possível fazer o login. Verifique seu login e senha.'});
                $scope.dataLoading = false;
            }
        });
    };
}