//ToDo: Replace to async config loading according to environment

import dev from './config.dev';
import prod from './config.prod';

const isProduction = process.env.NODE_ENV === 'production';
const currentEnvConf = isProduction ? prod : dev;

export default Object.assign({
    api: {
        protocol: '*',
        url: '*'
    },
    auth: {
        clientId: 'MKWebAppV1',
        clientSecret: 'mbO2FdS451lEz0fM8FlSM3n1rbokBSyy'
    },
    static: {
        avatars: '/avatars/'
    }
}, currentEnvConf);
