// ToDo: move to separate repo

/*
 ERROR — critical error, unhandled error
 WARN — something is wrong but app is in safety. use in error handler
 INFO — what is going now
 DEBUG — what is going now in details
 TRACE — log everything
 */

import Logger from './Logger';
import logLevels from './logLevels'

const loggers = {};

function getLogger(loggerName, level = logLevels.debug) {
    if (!(loggers[loggerName] instanceof Logger)) {
        loggers[loggerName] = new Logger(loggerName, level);
    }

    return loggers[loggerName];
}

export default getLogger;
