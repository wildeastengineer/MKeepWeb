export default class CookieClient {
    constructor(document) {
        this.document = document;
    }

    load(name) {
        const matches = this.document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    save(name, value, options = {}) {
        let expires = options.expires;

        if (typeof expires === 'number' && expires) {
            const d = new Date();

            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }

        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + '=' + value;

        for (let propName in options) {
            const propValue = options[propName];

            updatedCookie += '; ' + propName;

            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }

        this.document.cookie = updatedCookie;
    }

    remove(name, options = {}) {
        this.save(name, '', Object.assign(options, {
            expires: -1
        }));
    }
}
