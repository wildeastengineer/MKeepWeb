import logLevels from './logLevels'

class Logger {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    error(...messages) {
        this.print(logLevels.error, messages);
    }

    warn(...messages) {
        this.print(logLevels.warn, messages);
    }

    info(...messages) {
        this.print(logLevels.info, messages);
    }

    debug(...messages) {
        this.print(logLevels.debug, messages);
    }

    trace(...messages) {
        this.print(logLevels.trace, messages);
    }

    print(level, messages) {
        const logMethod = this.getLogMethod(level);


        if (messages.length === 1 && (typeof messages[0] === 'string')) {
            const message = this.getMessage(messages[0], level, this.name);

            logMethod(message);
        } else {
            const title = this.getMessage('', level, this.name);

            logMethod.apply(null, [title].concat(messages));
        }
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
        let formattedLevel;

        if (level === logLevels.error) {
            formattedLevel = level.toUpperCase();
        } else if (level === logLevels.warn) {
            formattedLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
        } else {
            formattedLevel = level.toLowerCase();
        }

        return `[${this.getTimeStamp()}] [${formattedLevel}] [${name}] - ${text}`;
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
