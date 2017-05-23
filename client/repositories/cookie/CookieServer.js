export default class CookieServer {
    constructor(params) {
        this.req = params.req;
        this.res = params.res;
    }

    load(name) {
        return this.req.cookies[name];
    }

    save(name, value, options = {}) {
        this.res.cookie(name, value, options);
    }

    remove(name, options = {}) {
        this.res.clearCookie(name, options);
    }
}
