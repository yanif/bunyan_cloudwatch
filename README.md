# bunyan_cloudwatch

var log = require('bunyan_cloudwatch');

log.settings({
    accessKeyId: '',
    secretAccessKey: '',
    region: ''
});

var test1 = log.create("test1");
test1.trace("trace");
test1.debug("debug");
test1.info("info");
test1.warn("warn");
test1.error("error");
test1.fatal("fatal");

