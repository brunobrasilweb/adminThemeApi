angular.module('app').controller('UsersController', UsersController);

function UsersController($scope, $routeParams, $location, $window, UsersService) {
    $scope.pageCurrent = ($routeParams.page) ? $routeParams.page : 1;
    $scope.list = function (q) {
        UsersService.getList($scope.pageCurrent, q).then(function (data) {
            $scope.pageTotal = data.page.totalPages;
            $scope.pages = pages($scope.pageTotal);
            $scope.users = data._embedded.users;
        });
    }

    $scope.list({});    

    $scope.save = function (user, userIndex) {
        UsersService.save(user).then(function(userSaved){
            if (userSaved.id) {
                if (!user.id) {
                    $scope.users.push(userSaved);
                    delete $scope.userAdd;
                } else {
                    $scope.users[userIndex] = userSaved;
                    delete $scope.userEdit;
                }

                $('input').val('');
                $('#form-add, #form-edit').modal('hide');
                noty({layout: 'topCenter', timeout: 2000, type: 'success', text: 'Usuário foi salvo.'});
            } else {
                noty({layout: 'topCenter', timeout: 2000, type: 'error', text: 'Não foi possível salvar o usuário. Tente novamente mais tarde.'});
            }
        });
            
    }

    $scope.edit = function (user, userIndex) {
        UsersService.getUser(user.id).then(function (user) {
            $scope.userEdit = user;
            $scope.userIndex = userIndex;
        });
    }        
    
    $scope.delete = function (id, userIndex) {
        var del = $window.confirm('Você tem certeza que deseja excluir o registro?');
        
        if (del) {
            UsersService.delete(id).then(function (ret) {
                if (!ret) {
                    $scope.users.splice(userIndex, 1);
                } else {
                    noty({layout: 'topCenter', timeout: 2000, type: 'error', text: 'Não foi possível deletar usuário. Tente novamente mais tarde.'});
                }
            });
        }
    }

    $scope.deleteMass = function (users) {
        var del = $window.confirm('Você tem certeza que deseja excluir registros em massa?');
        
        if (del) {
            angular.forEach(users, function(user, key) {
                if (user.selected) {
                    UsersService.delete(user.id).then(function (ret) {
                        if (!ret) {
                            $scope.users.splice(key, 1);
                        }
                    });
                }
            });
        }
    }

    $scope.clearSearch = function () {
        delete $scope.q;
        $scope.list({});
    }        
}