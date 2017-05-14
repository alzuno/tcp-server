/*
    Simple TCP Socket server
    Includes +SACK:GTHBD for Queclink devices
    Alvaro Zuno
    May 2017

    Requires:
    - Winston  -- https://github.com/winstonjs/winston
    - Winston Loggly Bulk -- https://github.com/loggly/winston-loggly-bulk/
*/

//Require net
var net = require('net');
var config = require('./config.json');
/*
    Saves to a file using Winston
    Put timestamp on logs
*/
'use strict';
const winston = require('winston');
require('winston-loggly-bulk');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date());
const logger = new (winston.Logger)({
  rewriters: [
            (level, msg, meta) => {
                meta.server = config.serverName;
                return meta;
            }
  ],
  transports: [
// colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/server.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    }),
    new (winston.transports.Loggly)({
      inputToken: config.logglyToken,
      subdomain: config.logglySubdomain,
      tags: ["Winston-NodeJS"],
      json:true
    }),
  ]
});

//Create TCP Server
var server = net.createServer();
server.on('connection', handleConnection);
//Listening port
server.listen(config.portNumber, function() {
  logger.info('TCP server listening on port %j', server.address().port);
});

//Connection
function handleConnection(conn) {
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  logger.info('New device connection from %s', remoteAddress);

  conn.setEncoding('utf8');

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

//On Data received
  function onConnData(d) {

  var message = d.substr(0, d.length - 1);
  var parsedData = message.split(',');
  var messageType = parsedData[0];

  //If the message is an HBD, then returns +SACK
  if (messageType === '+ACK:GTHBD') {
    var countNumber = parsedData[5].substring(0,4);
    var sack = '+SACK:GTHBD,,' + countNumber + '$\n';
    logger.info('Data from %s: %j', remoteAddress, d);
    conn.write(sack);
  }
  else {
    logger.info('Data from %s: %j', remoteAddress, d);
  }
}

//On Connection closed
  function onConnClose() {
    logger.warn('connection from %s closed', remoteAddress);
  }

//On connection error
  function onConnError(err) {
    logger.error('Connection %s error: %s', remoteAddress, err.message);
  }
}
