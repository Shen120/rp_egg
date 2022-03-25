import {UserInfo} from "../types/userTypes";
import {isEmpty} from "../tool/utils";

module.exports = (options, app) => {
    function uniqueArr(arr: Array<any>) {
        let n: Array<any> = [];
        for (let i = 0; i < arr.length; i++) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        }
        return n;
    }

    return async function checkAuth(ctx, next) {
        const url = ctx.request.url;
        const token = ctx.request.header.token;
        const blog = options.blog;
        const ssm = options.ssm;
        const ss = options.ss;
        const yqf = options.yqf;
        const routers = uniqueArr(blog.concat(ssm).concat(ss).concat(yqf));

        if (url === "/user/login" || url.indexOf("yqf") > -1) {
            await next()
            return
        }

        if (routers.indexOf(url) < 0 || isEmpty(token)) {
            ctx.body = {
                code: 401,
                message: "Permission Denied!1111111111",
            }
            return
        }

        const key = "login:" + token;
        let user = await app.redis.hgetall(key);

        if (token !== user.token || isEmpty(user.openid)) {
            ctx.body = {
                code: 401,
                message: "Permission Denied!22222222222222",
            }
            return
        }
        user = new UserInfo(user);

        if (isEmpty(user.enable)) {
            ctx.body = {
                code: 401,
                message: "Permission Denied!3333333333333",
            }
            return
        }

        ctx.user = user;
        global["user"] = user;
        Object.assign(ctx, user);

        if (user.userType > 1) {
            const temp: Array<any> = [];
            temp.push(blog);
            temp.push(ssm);
            temp.push(ss);
            temp.push(yqf);
            if (temp[user.userType - 2].indexOf(url) == -1) {
                ctx.body = {
                    code: 401,
                    message: "Permission Denied!444444444444",
                }
                return
            }
        }

        await next();
    }
}