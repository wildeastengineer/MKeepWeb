export default class CookieServer {
    constructor(req, res) {
        this.req = req;
        this.res = res;
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
