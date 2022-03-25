"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const userTypes_1 = require("../types/userTypes");
class HomeController extends egg_1.Controller {
    async index() {
        const { ctx } = this;
        // this.app.redis.hmset("temp:a",'a','1');
        // this.app.redis.hmset("temp:b",'b','2');
        // const keys = await this.app.redis.keys('temp:*');
        // for (const key in keys) {
        //     console.log(await this.app.redis.hgetall(keys[key]));
        // }
        // const a = await ctx.service.user.getAll();
        // console.log(await this.ctx.model.Role.findAll());
        const data = await ctx.service.blog.user.getAll();
        const us = [];
        for (const iterator of data) {
            us.push(new userTypes_1.Info(new userTypes_1.UserInfo(iterator)));
        }
        const keys = await this.app.redis.keys('tempUser:*');
        const tempUsers = [];
        for (const key in keys) {
            const user = await this.app.redis.hgetall(keys[key]);
            if (user) {
                tempUsers.push(new userTypes_1.Info(user));
            }
        }
        ctx.body = {
            code: 1,
            message: "OK",
            data: tempUsers.concat(us)
        };
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFDakMsa0RBQW9EO0FBQ3BELE1BQXFCLGNBQWUsU0FBUSxnQkFBVTtJQUMzQyxLQUFLLENBQUMsS0FBSztRQUNkLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsMENBQTBDO1FBQzFDLDBDQUEwQztRQUMxQyxvREFBb0Q7UUFDcEQsNEJBQTRCO1FBQzVCLDREQUE0RDtRQUM1RCxJQUFJO1FBQ0osNkNBQTZDO1FBQzdDLG9EQUFvRDtRQUNwRCxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsRCxNQUFNLEVBQUUsR0FBYyxFQUFFLENBQUM7UUFDekIsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDekIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFJLENBQUMsSUFBSSxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUM1QztRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sU0FBUyxHQUFjLEVBQUUsQ0FBQztRQUNoQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtZQUNwQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksRUFBRTtnQkFDTixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1AsSUFBSSxFQUFFLENBQUM7WUFDUCxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUJELGlDQThCQyJ9