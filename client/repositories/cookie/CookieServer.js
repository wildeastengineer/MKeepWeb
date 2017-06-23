export default class CookieServer {
    constructor(params) {
        this.req = params.req;
        this.res = params.res;
    }

    load(name) {
        const cookies = this.req.headers.cookie;
        const startIndex = cookies.lastIndexOf(name);
        const subString = cookies.substr(startIndex);
        const endIndex = subString.indexOf(';') > -1 ? subString.indexOf(';') : subString.length;

        return decodeURIComponent(subString.substring(subString.indexOf('=') + 1, endIndex));
    }

    save(name, value, options = {}) {
        this.res.cookie(name, value, options);
    }

    remove(name, options = {}) {
        this.res.clearCookie(name, options);
    }
}
