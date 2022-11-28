const { createLogger, transports } = require('winston');

const generalLogger = createLogger({
    transports : [
        new transports.Console()
    ]
});

generalLogger.stream = {
    write : (info) => {
        generalLogger.info(info);
    }
};

let log = (message) => {
    generalLogger.log({
        level : 'verbose',
        message : message
    });
};

let debug = (message) => {
    generalLogger.log({
        level : 'debug',
        message : message
    });
};

let info = (message) => {
    generalLogger.log({
        level : 'info',
        message : message
    });
};

let warn = (message) => {
    generalLogger.log({
        level : 'warn',
        message : message
    });
};

let error = (message) => {
    generalLogger.log({
        level : 'error',
        message : message
    });
};

module.exports = {
    log,
    debug,
    info,
    warn,
    error
};