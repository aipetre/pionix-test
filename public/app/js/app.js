'use strict';

/* App Module */

var phonecatApp = angular.module('pionixApp', [
    'ngRoute',
    'pionixControllers'
]);

phonecatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/projects', {
                templateUrl: 'app/partials/project-list.html',
                controller: 'ProjectListCtrl'
            }).
            when('/projects/:projectId', {
                templateUrl: 'app/partials/project-detail.html',
                controller: 'ProjectDetailCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
