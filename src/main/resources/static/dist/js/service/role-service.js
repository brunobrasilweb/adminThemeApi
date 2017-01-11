angular.module('app').service('RoleService', function($http, $rootScope, $cookieStore, ErrorAjax) {
    return {
        _search: function(q) {
            var queryString = null;
            if (q.name) queryString = "&name=" + q.name;

            return queryString;
        },
        getList: function(page, q) {
            page = parseInt(page) - 1;
            var sort = "id,desc";
            var urlApi = $rootScope.apiUrl + '/role';
            var search = this._search(q);
            if (search) {
                urlApi = $rootScope.apiUrl + '/role/search/list';
            }

            return $http.get(urlApi + '?' + search + '&sort=' + sort + '&page=' + page).then(function(response) {
                return response.data;
            }, function (error){
                return ErrorAjax.getError(error.data);
            });
        },
        save: function(role) {
            if (!role.id) {
                return $http.post($rootScope.apiUrl + '/role', role).then(function(response) {
                    return response.data;
                });
            } else {
                if (role.changePassword) {
                    role.password = md5(role.newPassword);
                    delete role.changePassword;
                    delete role.newPassword;
                }
                var id = role.id;
                return $http.put($rootScope.apiUrl + '/role/' + id, role).then(function(response) {
                    return response.data;
                });
            }            
        },
        getRole: function(id) {
            return $http.get($rootScope.apiUrl + '/role/' + id).then(function(response) {
                return response.data;
            });
        },
        delete: function(id) {
            return $http.delete($rootScope.apiUrl + '/role/' + id).then(function(response) {
                return response.data;
            });
        }
    };
});