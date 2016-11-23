angular.module('app').service('UsersService', function($http, $rootScope, $cookieStore, ErrorAjax) {
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
            var urlApi = $rootScope.apiUrl + '/users';
            var search = this._search(q);
            if (search) {
                urlApi = $rootScope.apiUrl + '/users/search/list';
            }

            return $http.get(urlApi + '?' + search + '&sort=' + sort + '&page=' + page).then(function(response) {
                return response.data;
            }, function (error){
                return ErrorAjax.getError(error.data);
            });
        },
        save: function(user) {
            if (!user.id) {
                return $http.post($rootScope.apiUrl + '/users', user).then(function(response) {
                    return response.data;
                });
            } else {
                if (user.changePassword) {
                    user.password = md5(user.newPassword);
                    delete user.changePassword;
                    delete user.newPassword;
                }
                var id = user.id;
                return $http.put($rootScope.apiUrl + '/users/' + id, user).then(function(response) {
                    return response.data;
                });
            }            
        },
        updateProfile: function(user) {
            var s = this;
            if (user.changePassword) {
                user.password = md5(user.newPassword);
                delete user.changePassword;
                delete user.newPassword;
            }
            var id = user.id;
            return $http.put($rootScope.apiUrl + '/users/' + id, user).then(function(response) {
                s.setDataUserLogged(response.data);
                return response.data;
            });
        },
        setDataUserLogged: function(data) {
            $cookieStore.put('user', data);
            $rootScope.userLogged = data;
        },
        getUser: function(id) {
            return $http.get($rootScope.apiUrl + '/users/' + id).then(function(response) {
                return response.data;
            });
        },
        getByLogin: function(login) {
            return $http.get($rootScope.apiUrl + '/users/by-login/' + login).then(function(response) {
                return response.data;
            });
        },
        delete: function(id) {
            return $http.delete($rootScope.apiUrl + '/users/' + id).then(function(response) {
                return response.data;
            });
        },
        login: function(username, password) {
            var s = this;
            var config = {
                method: 'POST',
                url: $rootScope.apiUrlOAuth,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: 'client_secret=' + $rootScope.apiClientSecret + '&client_id=' + $rootScope.apiClientId + '&scope=' + $rootScope.apiScope + '&grant_type=password&username=' + username + '&password=' + md5(password)
            };

            return $http(config).then(function (response) {
                var expiresIn = moment().add(response.data.access_token, 'seconds');
                var token = response.data.access_token;
                $cookieStore.put('access_token', token);
                $cookieStore.put('expires_in', expiresIn.format("YYMMDDhmmss"));
                $cookieStore.put('refresh_token', response.data.refresh_token);
                $cookieStore.put('Authorization', 'Bearer ' + token);

                s.getByLogin(username).then(function(data){
                    s.setDataUserLogged(data);
                });

                return response.data;
            }, function (error){
                return error.data;
            });
        },
        refreshToken: function () {
            var now = parseInt(moment().format("YYYYMMDDHHmmss"));
            var expiresIn = parseInt($cookieStore.get('expires_in')) || 0;

            //if (now > expiresIn) {
                //delete $http.defaults.headers.common['Authorization'];
                var config = {
                    method: 'POST',
                    url: $rootScope.apiUrlOAuth,
                    headers: {
                        'Authorization': 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: 'grant_type=refresh_token&client_secret=' + $rootScope.apiClientSecret + '&client_id=' + $rootScope.apiClientId + '&refresh_token=' + $cookieStore.get('refresh_token')
                };
                return $http(config).then(function (response) {
                    var expiresIn = moment().add(response.data.access_token, 'seconds');
                    var token = response.data.access_token;
                    $cookieStore.put('access_token', token);
                    $cookieStore.put('expires_in', expiresIn.format("YYMMDDhmmss"));
                    $cookieStore.put('refresh_token', response.data.refresh_token);
                    $cookieStore.put('Authorization', 'Bearer ' + token);

                    return response.data;
                }, function(error){
                    return ErrorAjax.getError(error.data);
                });
            //}
        },
        logout: function() {
            $cookieStore.remove('access_token');
            $cookieStore.remove('expires_in');
            $cookieStore.remove('refresh_token');
            $cookieStore.remove('user');
            $cookieStore.put('Authorization', 'Basic gr3434g34g34g5');
        }
    };
});