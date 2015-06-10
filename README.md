Write [bunyan](https://github.com/trentm/node-bunyan) logs to [AWS CloudWatch](http://aws.amazon.com/cloudwatch/).


##Usage

``` js
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
```

##API

###settings(opts)
With `opts` of:
- `accessKeyId` (required)
- `secretAccessKey` (required)
- `region` (required): the AWS region e.g. `us-west-1`

###create(logGroup)
- `logGroup` (required)

On write of the first log, the module creates the logGroup and logStream if necessary.

- [`CloudWatchLogs.putLogEvents`](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatchLogs.html#putLogEvents-property) is the method we use to write logs

##Contributors
This project was created by Felix Weizman ([@felixW](https://github.com/felixW)).
