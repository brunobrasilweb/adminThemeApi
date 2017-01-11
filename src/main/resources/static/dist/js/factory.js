angular.module('app').factory('ErrorAjax', function ($rootScope, $location) {
    return {
        getError: function(data) {
            console.log("Deu erro no ajax. " . data);

            if (data) {
                if (data.error == "invalid_token"
                || data.error == "unauthorized"
                || data.error == "invalid_grant") {
                    $rootScope.logout();
                } else if (data.error == "access_denied") {
                    noty({layout: 'topCenter', timeout: 2000, type: 'alert', text: 'Você não tem permissão para acessar a página.'});
                    $location.path('/');
                } else {
                    $location.path('/404');
                }
            } else {
                $location.path('/404');
            }
        }
    };
});