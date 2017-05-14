require("font-awesome-webpack");
import css from './styles/app.scss';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';

import LocalStorage from './services/local.storage';

angular.module("MyDiveLogbook", ['ui.router', 'ngResource'])
  .factory("LocalStorage", LocalStorage);

  