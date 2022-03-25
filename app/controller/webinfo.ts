import {Controller} from "egg";

export default class WebInfoController extends Controller{
    // 获取基本信息
    public async getWebInfo() {
        const {ctx} = this;
        ctx.body = {
            code: 1,
            msg: "success",
            data: [
                {key: 1, name: "t1"},
                {key: 2, name: "t2"},
            ]
        }
    }

}