angular.module('app').service('UsersService', function($http, $rootScope) {
    return {
        _search: function(q) {
            var queryString = null;
            if (q.name) queryString = "&name=" + q.name;
            if (q.email) queryString += "&email=" + q.email;
            
            return queryString;
        },
        getList: function(page, q) {
            page = parseInt(page) - 1;
            var sort = "id,desc";
            var urlApi = $rootScope.urlApi + '/users';
            var search = this._search(q);
            if (search) {
                urlApi = $rootScope.urlApi + '/users/search/list';
            }

            return $http.get(urlApi + '?' + search + '&sort=' + sort + '&page=' + page).then(function(response) {
                return response.data;
            });
        },
        save: function(user) {
            if (!user.id) {
                return $http.post($rootScope.urlApi + '/users', user).then(function(response) {
                    return response.data;
                });
            } else {
                var id = user.id;
                return $http.put($rootScope.urlApi + '/users/' + id, user).then(function(response) {
                    return response.data;
                });
            }            
        },
        getUser: function(id) {
            return $http.get($rootScope.urlApi + '/users/' + id).then(function(response) {
                return response.data;
            });
        },
        delete: function(id) {
            return $http.delete($rootScope.urlApi + '/users/' + id).then(function(response) {
                return response.data;
            });
        }
    };
});