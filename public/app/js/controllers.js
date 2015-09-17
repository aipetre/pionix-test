'use strict';

/* Controllers */

var pionixControllers = angular.module('pionixControllers', []);

pionixControllers.controller('ProjectListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http({
            url: '/projects',
            method: 'GET'
        }).success(
            function (response) {
                $scope.projects = response;
            }
        );

        $scope.Delete = function (projectId, projectName) {
            $http({
                url: '/projects/' + projectId,
                method: 'delete'
            }).success(
                function () {
                    $scope.message = "Project '" + projectName + "' Deleted";
                }
            );
        };
    }]);

pionixControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http({
            url: '/projects/' + $routeParams.projectId,
            method: 'GET'
        }).success(
            function (response) {
                $scope.project = response;
            }
        );

        $scope.Update = function (projectId) {
            $http({
                url: '/projects/' + projectId,
                method: 'put',
                data: {
                    name: document.getElementById('name').value
                }
            }).success(
                function () {
                    $scope.message = 'Project updated';
                }
            );
        }
    }]);
