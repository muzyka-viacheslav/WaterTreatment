/* global moment:false */

import '../../bower_components/bootstrap/dist/js/bootstrap.min';

import { config } from './index.config';
import { routerConfig } from './index.route';

import { runBlock } from './index.run';

import { MainController } from './main/main.controller';
import { WaterObjectController } from './waterObject/waterObject.controller';
import { MapPageController } from './map/mapPage.controller';
import { AboutController } from './about/about.controller';
import { AddObjectController } from './addObject/addObject.controller';

import { DiplomApi } from './services/api';
import { MapService } from './services/map';
import { PolygonsService } from './services/polygon';

import { NavbarDirective } from '../app/components/navbar/navbar.directive';

let local = 'http://localhost:4000/';
let selfIP = 'http://192.168.88.254:4000/';
angular.module('waterTreatment', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'textAngular'])
  .constant('moment', moment)
  .constant('API_URL', local)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('WaterObjectController', WaterObjectController)
  .controller('MapPageController', MapPageController)
  .controller('AboutController', AboutController)
  .controller('AddObjectController', AddObjectController)
  .service('api', DiplomApi)
  .service('map', MapService)
  .service('polygon', PolygonsService)
  .directive('waterNavbar', NavbarDirective);
