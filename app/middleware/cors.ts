module.exports = () => {
    return async function cors(ctx, next) {
        // 处理OPTIONS请求
        if (ctx.method === 'OPTIONS') {
            ctx.body = '';
        }
        ctx.set('Access-Control-Allow-Origin', '*');
        // 设置所允许的HTTP请求方法
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
        // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
        ctx.set('Access-Control-Allow-Headers', '*');
        await next();
    };
};