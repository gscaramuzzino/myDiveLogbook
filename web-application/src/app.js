require("font-awesome-webpack");
import css from './styles/app.scss';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';

import LocalStorage from './services/local.storage';
import AppRouter from './app.route';
import AuthManager from './services/auth.manager';
import HttpInterceptor from './services/http.interceptor';

import NavbarController from './views/navbar/navbar.controller';
import LoginController from './views/login/login.controller'; 

let AppModule = angular.module("MyDiveLogbook", ['ui.router', 'ngResource']);
AppModule.config(AppRouter);
AppModule.factory("AuthManager", AuthManager);
AppModule.factory("LocalStorage", LocalStorage);
AppModule.factory("HttpInterceptor", HttpInterceptor);
AppModule.controller("LoginController", LoginController);
AppModule.controller("NavbarController", NavbarController);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['MyDiveLogbook']);
});

export default AppModule;