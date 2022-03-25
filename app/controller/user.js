"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const userTypes_1 = require("../types/userTypes");
const utils_1 = require("../tool/utils");
class UserController extends egg_1.Controller {
    async login() {
        try {
            const { ctx } = this;
            const res = await ctx.service.blog.user.auth(ctx.request.body.code);
            let resData;
            if (res.state) {
                resData = {
                    code: 1,
                    message: 'OK',
                    data: res.data
                };
            }
            else {
                resData = {
                    code: 0,
                    message: res.error
                };
            }
            ctx.body = resData;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // 更新token
    async updateToken() {
        try {
            const { ctx } = this;
            const data = ctx.request.body;
            const user = utils_1.getUser();
            const check = !!(user.openid === data.openid && data.oldToken);
            if (check) {
                const res = await ctx.service.blog.user.renewalToken(data.oldToken);
                ctx.body = {
                    code: 1,
                    message: 'OK',
                    data: res
                };
                return;
            }
            ctx.body = {
                code: 0,
                message: "用户验证失败"
            };
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // 退出登录
    async loginOut() {
        try {
            const { ctx } = this;
            const data = ctx.request.body;
            const user = utils_1.getUser();
            const check = !!(user.openid === data.openid && data.oldToken);
            if (check) {
                await ctx.service.blog.user.clearLogin(data.oldToken);
                ctx.body = {
                    code: 1,
                    message: 'OK',
                };
                return;
            }
            ctx.body = {
                code: 0,
                message: "用户验证失败"
            };
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // 当前用户信息
    async index() {
        try {
            const { ctx } = this;
            const { user } = ctx;
            let resData = {
                code: 0,
                message: "server error!"
            };
            if (user && user.id) {
                resData = {
                    code: 1,
                    message: "OK",
                    data: new userTypes_1.Info(user)
                };
            }
            ctx.body = resData;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // 所有用户
    async all() {
        const { ctx } = this;
        let resData = {
            code: 0,
            message: 'Server Error！'
        };
        try {
            const list = await ctx.service.blog.user.list();
            resData = {
                code: 1,
                message: "OK",
                data: list
            };
            ctx.body = resData;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    // 用户权限列表
    async power() {
        try {
            const { ctx } = this;
            const { user, service } = ctx;
            let resData = {};
            if (user) {
                const res = await service.blog.user.power(user.type);
                resData = {
                    code: 1,
                    message: "OK",
                    data: res
                };
            }
            else {
                resData = {
                    code: 0,
                    message: 'Server Error!'
                };
            }
            ctx.body = resData;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // 用户启用/禁用/权限更改
    async update() {
        try {
            const { ctx } = this;
            const { user, service } = ctx;
            const { openid, type, enable } = ctx.request.body;
            let resData;
            if (openid) {
                const data = await service.blog.user.update(parseInt(user.type), openid, type, enable);
                if (data && data.length > 0) {
                    resData = {
                        code: 1,
                        message: 'OK',
                        data
                    };
                }
                else {
                    resData = {
                        code: 0,
                        message: 'Update Failed!'
                    };
                }
            }
            else {
                resData = {
                    code: 0,
                    message: 'Parameter Error!'
                };
            }
            ctx.body = resData;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    //删除用户
    async delete() {
        try {
            const { ctx } = this;
            const { user, service } = ctx;
            const { openid } = ctx.request.body;
            const res = await service.blog.user.delete(user, openid);
            let resData = {
                code: 0,
                message: 'Failed!'
            };
            if (res) {
                resData = {
                    code: 1,
                    message: 'OK',
                    data: res
                };
            }
            ctx.body = resData;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBK0I7QUFDL0Isa0RBQXdDO0FBQ3hDLHlDQUFzQztBQVF0QyxNQUFxQixjQUFlLFNBQVEsZ0JBQVU7SUFDM0MsS0FBSyxDQUFDLEtBQUs7UUFDZCxJQUFJO1lBQ0EsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQztZQUNuQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsSUFBSSxPQUF5QixDQUFDO1lBQzlCLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDWCxPQUFPLEdBQUc7b0JBQ04sSUFBSSxFQUFFLENBQUM7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUNqQixDQUFBO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxHQUFHO29CQUNOLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSztpQkFDckIsQ0FBQTthQUNKO1lBQ0QsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDdEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNILEtBQUssQ0FBQyxXQUFXO1FBQ3BCLElBQUk7WUFDQSxNQUFNLEVBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzlCLE1BQU0sSUFBSSxHQUFHLGVBQU8sRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0QsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEUsR0FBRyxDQUFDLElBQUksR0FBRztvQkFDUCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxPQUFPLEVBQUUsSUFBSTtvQkFDYixJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFBO2dCQUNELE9BQU07YUFDVDtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLFFBQVE7YUFDcEIsQ0FBQTtTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFDQSxLQUFLLENBQUMsUUFBUTtRQUNqQixJQUFJO1lBQ0EsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQztZQUNuQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUM5QixNQUFNLElBQUksR0FBRyxlQUFPLEVBQUUsQ0FBQztZQUN2QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9ELElBQUksS0FBSyxFQUFFO2dCQUNQLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELEdBQUcsQ0FBQyxJQUFJLEdBQUc7b0JBQ1AsSUFBSSxFQUFFLENBQUM7b0JBQ1AsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUE7Z0JBQ0QsT0FBTTthQUNUO1lBQ0QsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsUUFBUTthQUNwQixDQUFBO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNGLEtBQUssQ0FBQyxLQUFLO1FBQ2QsSUFBSTtZQUNBLE1BQU0sRUFBQyxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLEdBQUcsQ0FBQztZQUNuQixJQUFJLE9BQU8sR0FBcUI7Z0JBQzVCLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxlQUFlO2FBQzNCLENBQUM7WUFFRixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNqQixPQUFPLEdBQUc7b0JBQ04sSUFBSSxFQUFFLENBQUM7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFLElBQUksZ0JBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3ZCLENBQUE7YUFDSjtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFDQSxLQUFLLENBQUMsR0FBRztRQUNaLE1BQU0sRUFBQyxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxPQUFPLEdBQXFCO1lBQzVCLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQztRQUNGLElBQUk7WUFDQSxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoRCxPQUFPLEdBQUc7Z0JBQ04sSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFBO1lBQ0QsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDdEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDekI7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNGLEtBQUssQ0FBQyxLQUFLO1FBQ2QsSUFBSTtZQUNBLE1BQU0sRUFBQyxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxFQUFFO2dCQUNOLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckQsT0FBTyxHQUFHO29CQUNOLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxJQUFJO29CQUNiLElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUE7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLEdBQUc7b0JBQ04sSUFBSSxFQUFFLENBQUM7b0JBQ1AsT0FBTyxFQUFFLGVBQWU7aUJBQzNCLENBQUE7YUFDSjtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELGVBQWU7SUFDUixLQUFLLENBQUMsTUFBTTtRQUNmLElBQUk7WUFDQSxNQUFNLEVBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVCLE1BQU0sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hELElBQUksT0FBeUIsQ0FBQztZQUM5QixJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZGLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN6QixPQUFPLEdBQUc7d0JBQ04sSUFBSSxFQUFFLENBQUM7d0JBQ1AsT0FBTyxFQUFFLElBQUk7d0JBQ2IsSUFBSTtxQkFDUCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILE9BQU8sR0FBRzt3QkFDTixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxPQUFPLEVBQUUsZ0JBQWdCO3FCQUM1QixDQUFBO2lCQUNKO2FBRUo7aUJBQU07Z0JBQ0gsT0FBTyxHQUFHO29CQUNOLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxrQkFBa0I7aUJBQzlCLENBQUE7YUFDSjtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELE1BQU07SUFDQyxLQUFLLENBQUMsTUFBTTtRQUNmLElBQUk7WUFDQSxNQUFNLEVBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVCLE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekQsSUFBSSxPQUFPLEdBQXFCO2dCQUM1QixJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsU0FBUzthQUNyQixDQUFDO1lBQ0YsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxHQUFHO29CQUNOLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxJQUFJO29CQUNiLElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUE7YUFDSjtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztDQUNKO0FBdE1ELGlDQXNNQyJ9