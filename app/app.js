'use strict';
import angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.bugtracker'
])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      template: '<bugtracker></bugtracker>',
    });
  }]);
