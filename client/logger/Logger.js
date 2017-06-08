import logLevels from './logLevels'

class Logger {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    error(text) {
        this.print(text, logLevels.error);
    }

    warn(text) {
        this.print(text, logLevels.warn);
    }

    info(text) {
        this.print(text, logLevels.info);
    }

    debug(text) {
        this.print(text, logLevels.debug);
    }

    trace(text) {
        this.print(text, logLevels.trace);
    }

    print(text, level) {
        const message = this.getMessage(text, level, this.name);

        this.getLogMethod(level)(message);
    }

    getLogMethod(level) {
        /* eslint-disable no-alert, no-console, no-undef */
        if (typeof window !== 'undefined' && window.console) {
            switch (level) {
                case logLevels.trace:
                    return console.log;
                case logLevels.debug:
                    return console.log;
                case logLevels.info:
                    return console.info;
                case logLevels.warn:
                    return console.warn;
                case logLevels.error:
                    return console.error;
                default:
                    return console.warn;
            }
        } else {
            return console.log;
        }
        /* eslint-enable no-alert, no-console, no-undef */
    }

    getMessage(text, level, name) {
        return `[${this.getTimeStamp()}] [${level}] [${name}] - ${text}`;
    }

    getTimeStamp() {
        const date = new Date();
        const year = date.getFullYear();
        const month = formatNumber(date.getMonth() + 1);
        const day = formatNumber(date.getDay());
        const hours = formatNumber(date.getHours());
        const minutes = formatNumber(date.getMinutes());
        const seconds = formatNumber(date.getSeconds());
        const milliseconds = formatNumber(date.getMilliseconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        function formatNumber(number) {
            return number < 10 ? ('0' + number) : ('' + number);
        }
    }
}

export default Logger;
