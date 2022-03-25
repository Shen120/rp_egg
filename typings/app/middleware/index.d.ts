// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckAuth from '../../../app/middleware/checkAuth';
import ExportCors from '../../../app/middleware/cors';
import ExportErrorHandler from '../../../app/middleware/errorHandler';

declare module 'egg' {
  interface IMiddleware {
    checkAuth: typeof ExportCheckAuth;
    cors: typeof ExportCors;
    errorHandler: typeof ExportErrorHandler;
  }
}
