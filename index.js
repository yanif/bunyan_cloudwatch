var bunyan = require('bunyan'),
    MemoryStream = require('memorystream'),
    es = require('event-stream');

var _aws;

module.exports.create = function (loggerName) {
    var lawgs = require('lawgs');
    
    var translateLevel = function(level) {
        if (level == 60)
            return "fatal";
        else if (level == 50)
            return "error";
        else if (level == 40)
            return "warn";
        else if (level == 30)
            return "info";
        else if (level == 20)
            return "debug";
        else if (level == 10)
            return "trace";
        else
            return "info";
    }
    
    if (_aws !== undefined) {
        // Lawgs configuration is mandatory
        lawgs.config({
            aws: {
                accessKeyId: _aws.accessKeyId,
                secretAccessKey: _aws.secretAccessKey,
                region: _aws.region
            }
        });
    }
    
    var logger = lawgs.getOrCreate(loggerName); /* LogGroup */
    
    // Logger configuration is optional
    logger.config({
        // Shows the debugging messages
        showDebugLogs: true, /* Default to false */
        // Change the frequency of log upload, regardless of the batch size
        uploadMaxTimer: 1000, /* Defaults to 5000ms */
        // Max batch size. An upload will be triggered if this limit is reached within the max upload time
        uploadBatchSize: 500 /* Defaults to 500 */
    });
    
    var memStream = new MemoryStream();
    
    memStream
    .pipe(es.split())
    .pipe(es.map(function (line, cb) {
        var obj = JSON.parse(line);
        var level = translateLevel(obj.level);
        logger.log(level, obj);
        //do something with the line 
        cb(null, line)
    }));
    
    return bunyan.createLogger({
        name: loggerName,
        streams: [
            {
                stream: memStream,
                level: "debug"
            }
        ]
    });
};

module.exports.settings = function (aws) { 
    _aws = aws;
};

