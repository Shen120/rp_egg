// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportUser = require('../../../app/controller/user');
import ExportWebinfo from '../../../app/controller/webinfo';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    webinfo: ExportWebinfo;
  }
}
