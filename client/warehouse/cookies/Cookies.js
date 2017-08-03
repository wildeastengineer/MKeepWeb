/**
 * @typedef {Object} CookieOptions
 * @property {string} [domain] - Domain name for the cookie. Defaults to the domain name of the app.
 * @property {Function} [encode] - A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
 * @property {Date} [expires] - Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
 * @property {boolean} [httpOnly] - Flags the cookie to be accessible only by the web server.
 * @property {number} [maxAge] - Convenient option for setting the expiry time relative to the current time in milliseconds.
 * @property {string} [path] - Path for the cookie. Defaults to “/”.
 * @property {boolean} [secure] - Marks the cookie to be used with HTTPS only.
 * @property {boolean} [signed] - Indicates if the cookie should be signed.
 * @property {(boolean|string)} [sameSite] - Value of the “SameSite” Set-Cookie attribute.
 *                                           More information at https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1.
 */

import CookiesClient from './CookiesClient';
import CookiesServer from './CookiesServer';

export default class Cookie {
    constructor(...params) {
        if (params.length === 2) {
            this.cookies = new CookiesServer(params[0], params[1]);
        } else {
            this.cookies = new CookiesClient(params[0]);
        }
    }

    /**
     * @param {string} name
     *
     * @returns {string}
     */
    load(name) {
        return decodeURIComponent(this.cookies.load(name));
    }

    /**
     * @param {string} name
     * @param {string} value
     * @param {CookieOptions} options
     *
     * @returns void
     */
    save(name, value, options = {}) {
        this.remove(name);

        this.cookies.save(name, encodeURIComponent(value), Object.assign({
            path: '/'
        }, options));
    }

    /**
     * @param {string} name
     * @param {CookieOptions} options
     *
     * @returns void
     */
    remove(name, options = {}) {
        this.cookies.remove(name, Object.assign({
            path: '/'
        }, options));
    }
}
