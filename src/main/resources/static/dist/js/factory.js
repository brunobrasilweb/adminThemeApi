angular.module('app').factory('ErrorAjax', function ($rootScope, $location) {
    return {
        getError: function(data) {
            if (data) {
                if (data.error == "invalid_token"
                || data.error == "unauthorized"
                || data.error == "invalid_grant") {
                    $rootScope.logout();
                } else {
                    $location.path('/404');
                }
            } else {
                $location.path('/404');
            }
        }
    };
});