require("font-awesome-webpack");
import css from './styles/app.scss';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';

import LocalStorage from './services/local.storage';
import AppRouter from './app.route';
import AppConfig from './app.config';
import AuthManager from './services/auth.manager';
import HttpInterceptor from './services/http.interceptor';

import NavbarController from './views/navbar/navbar.controller';
import HomeController from './views/home/home.controller'; 
import ProfileController from './views/profile/profile.controller'; 
import DiveController from './views/dive/dive.controller'; 

let AppModule = angular.module("MyDiveLogbook", ['ui.router', 'ngResource']);
AppModule.constant("baseURL", "https://localhost:3443/");
AppModule.config(AppRouter);
AppModule.config(AppConfig);
AppModule.factory("AuthManager", AuthManager);
AppModule.factory("LocalStorage", LocalStorage);
AppModule.factory("HttpInterceptor", HttpInterceptor);
AppModule.controller("HomeController", HomeController);
AppModule.controller("ProfileController", ProfileController);
AppModule.controller("DiveController", DiveController);
AppModule.controller("NavbarController", NavbarController);
angular.element(document).ready(() => {
  angular.bootstrap(document, ['MyDiveLogbook']);
});

export default AppModule;