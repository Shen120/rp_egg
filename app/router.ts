import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 查询网站信息
  router.get("/api/webInfo", controller.webinfo.getWebInfo);

};
