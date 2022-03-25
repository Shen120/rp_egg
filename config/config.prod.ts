import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    // 数据库
    config.sequelize = {
        datasources: [
            // some code
        ]
    };
    config.redis = {
        client: {
            // some config
        },
    };
    return config;
};
