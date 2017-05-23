import CookieClient from './CookieClient';
import CookieServer from './CookieServer';

export default class Cookie {
    constructor(params) {
        switch (params.type) {
            case 'client':
                this.cookie = new CookieClient();
                break;
            case 'server':
                this.cookie = new CookieServer(params);
                break;
            default:
                console.error('Cookie type is not specified.');
        }
    }

    load(name) {
        return this.cookie.load(name);
    }

    save(name, value, options = {}) {
        return this.cookie.save(name, value, options);
    }

    remove(name) {
        return this.cookie.remove(name);
    }
}
