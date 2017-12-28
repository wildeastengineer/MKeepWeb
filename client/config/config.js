//ToDo: Replace to async config loading according to environment

//import dev from './config.dev';
import prod from './config.prod';

/* eslint-disable no-alert, no-process-env, no-undef */
const isBuilding = !!process.env.BUILDING;
//const isProduction = process.env.NODE_ENV === 'production';
/* eslint-enable no-alert, no-process-env, no-undef */

const currentEnvConf = prod;

export default Object.assign({
    isBuilding,
    api: {
        protocol: '*',
        url: '*'
    },
    auth: {
        clientId: 'MKWebAppV1',
        clientSecret: 'mbO2FdS451lEz0fM8FlSM3n1rbokBSyy'
    },
    defaultLanguage: 'en',
    availableLanguages: [
        'en',
        'ru'
    ],
    static: {
        avatars: '/avatars/'
    }
}, currentEnvConf);
