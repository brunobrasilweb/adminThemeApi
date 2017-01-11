angular.module('app').controller('RoleController', RoleController);

function RoleController($scope, $rootScope, $routeParams, $location, $window, RoleService, cfpLoadingBar) {
    $rootScope.title = "Cargos";

    $scope.pageCurrent = ($routeParams.page) ? $routeParams.page : 1;
    $scope.list = function (q) {
        RoleService.getList($scope.pageCurrent, q).then(function (data) {
            $scope.pageTotal = data.page.totalPages;
            $scope.pages = pages($scope.pageTotal);
            $scope.roles = data._embedded.role;
        });
    }

    $scope.list({});    

    $scope.save = function (role, roleIndex) {
        cfpLoadingBar.start();
        RoleService.save(role).then(function(roleSaved){
            if (roleSaved.id) {
                if (!role.id) {
                    $scope.roles.push(roleSaved);
                    delete $scope.roleAdd;
                } else {
                    $scope.roles[roleIndex] = roleSaved;
                    delete $scope.roleEdit;
                }

                $('input').val('');
                $('#form-add, #form-edit').modal('hide');
                cfpLoadingBar.complete();
                noty({layout: 'topCenter', timeout: 2000, type: 'success', text: 'O Cargo foi salvo.'});
            } else {
                noty({layout: 'topCenter', timeout: 2000, type: 'error', text: 'Não foi possível salvar o cargo. Tente novamente mais tarde.'});
            }
        });
            
    }

    $scope.edit = function (role, roleIndex) {
        RoleService.getRole(role.id).then(function (role) {
            $scope.roleEdit = role;
            $scope.roleIndex = roleIndex;
        });
    }        
    
    $scope.delete = function (id, roleIndex) {
        var del = $window.confirm('Você tem certeza que deseja excluir o registro?');
        
        if (del) {
            RoleService.delete(id).then(function (ret) {
                if (!ret) {
                    $scope.roles.splice(roleIndex, 1);
                } else {
                    noty({layout: 'topCenter', timeout: 2000, type: 'error', text: 'Não foi possível deletar o cargo. Tente novamente mais tarde.'});
                }
            });
        }
    }

    $scope.deleteMass = function (role) {
        var del = $window.confirm('Você tem certeza que deseja excluir registros em massa?');
        
        if (del) {
            angular.forEach(role, function(role, key) {
                if (role.selected) {
                    RoleService.delete(role.id).then(function (ret) {
                        if (!ret) {
                            $scope.roles.splice(key, 1);
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