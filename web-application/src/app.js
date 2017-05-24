require("font-awesome-webpack");
import css from './styles/app.scss';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';

import LocalStorage from './services/local.storage';
import AppRouter from './app.route';
import AuthManager from './services/auth.manager';
import './services/auth.manager';

import NavbarController from './views/navbar/navbar.controller';

let appModule = angular.module("MyDiveLogbook", ['ui.router', 'ngResource']);
appModule.config(AppRouter);
appModule.service("AuthManager", AuthManager);
appModule.service("LocalStorage", LocalStorage);
appModule.controller("NavbarController", NavbarController);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['MyDiveLogbook']);
});

export default appModule;