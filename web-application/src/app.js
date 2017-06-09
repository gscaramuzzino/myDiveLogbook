require("font-awesome-webpack");
 import * as $ from 'jquery';

import css from './styles/app.scss';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngResource from 'angular-resource';

import User from './models/user';

import LocalStorage from './services/local.storage';
import AppRouter from './app.route';
import AppConfig from './app.config';
import AuthManager from './services/auth.manager';
import HttpInterceptor from './services/http.interceptor';
import UiManager from './services/ui.manager';
import LogbookManager from './views/logbook/logbook.manager';
import CertificateManager from './views/certificate/certificate.manager';

import NavbarController from './views/navbar/navbar.controller';
import HomeController from './views/home/home.controller';
import ProfileController from './views/profile/profile.controller';
import DiveController from './views/dive/dive.controller';
import LogbookController from './views/logbook/logbook.controller';
import CertificateController from './views/certificate/certificate.controller';

let AppModule = angular.module("MyDiveLogbook", ['ui.router', 'ngResource']);
AppModule.constant("baseURL", "");
AppModule.config(AppRouter);
AppModule.config(AppConfig);
AppModule.factory("User", User);
AppModule.factory("AuthManager", AuthManager);
AppModule.factory("LocalStorage", LocalStorage);
AppModule.factory("HttpInterceptor", HttpInterceptor);
AppModule.factory("UiManager", UiManager);
AppModule.factory("LogbookManager", LogbookManager);
AppModule.factory("CertificateManager", CertificateManager);
AppModule.controller("HomeController", HomeController);
AppModule.controller("ProfileController", ProfileController);
AppModule.controller("DiveController", DiveController);
AppModule.controller("LogbookController", LogbookController);
AppModule.controller("NavbarController", NavbarController);
AppModule.controller("CertificateController", CertificateController);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['MyDiveLogbook']);
});


export default AppModule;