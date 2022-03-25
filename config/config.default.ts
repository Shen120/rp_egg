import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = `${appInfo.name}_${Math.random()}_${Date.now().valueOf()}`;
    config.proxy = true;
    // config.cluster = {
    //     listen: {
    //         port: 80,
    //         hostname: '127.0.0.1',
    //     },
    // };
    config.httpclient = {
        request: {
            timeout: 50000,
        },
        httpAgent: {
            freeSocketTimeout: 40000,
        },
        httpsAgent: {
            freeSocketTimeout: 40000,
        },
    };

    // add your egg config in here
    config.middleware = [
        // 'checkAuth',
        "errorHandler",
    ];
    config.errorHandler = {
        // match: '/api',
    };
    // config.checkAuth = {
    //     api: [
    //
    //     ]
    // }
    // add your special config in here
    // const bizConfig = {
    //   sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    // };
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ["*"]
    };
    // 设置跨域
    config.cors = {
        // 设置来源
        // origin: "*",
        // 带cookie
        credentials: true,
        allowMethods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],
        allowHeaders: [
            'Content-Type',
            'Accept',
            'Authorization',
            'X-Requested-With',
            'set-cookie',
            'token',
        ],
    };

    config.multipart = {
        whitelist: [
            // images
            '.jpg', '.jpeg', // image/jpeg
            '.png', // image/png, image/x-png
            '.gif', // image/gif
            '.bmp', // image/bmp
            '.wbmp', // image/vnd.wap.wbmp
            '.webp',
            '.tif',
            '.psd',
            ".pdf",
            // text
            '.svg',
            '.js', '.jsx', ".ts", ".tsx",
            '.json',
            '.css', '.less', ".scss",
            '.html', '.htm',
            '.xml',
            ".txt",
            ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx",
            ".sql",
            // tar
            '.zip',
            '.gz', '.tgz', '.gzip',
            // video
            '.mp3',
            '.mp4',
            '.avi',
        ]
    }
    // the return config will combines to EggAppConfig
    return {
        ...config,
        // ...bizConfig,
    };
};
