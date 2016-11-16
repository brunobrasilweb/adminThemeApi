angular.module('app').controller('LoginController', LoginController);

function LoginController($scope, $location, AuthenticationService) {
    
    (function initController() {
        AuthenticationService.ClearCredentials();
    })();

    $scope.login = function() {
        $scope.dataLoading = true;
        AuthenticationService.Login(username, password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials(username, password);
                $location.path('/');
            } else {
                $scope.dataLoading = false;
            }
        });
    };
}