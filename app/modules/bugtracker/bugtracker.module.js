'use strict';

import BugsService from './bugtracker.factory.js';
import bugtracker from './bugtracker.directive.js';

angular.module('myApp.bugtracker', [])
  .directive('bugtracker', bugtracker)
  .factory('BugsService', BugsService);
