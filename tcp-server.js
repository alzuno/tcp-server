/*
    TCP Socket server
    Alvaro Zuno
    May 2017

    Requires: Winston
    npm install winston
*/

//Require net
var net = require('net');

/*  Winston logger -- https://github.com/winstonjs/winston
    Saves to a file
    Put timestamp on logs
*/
'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date());
const logger = new (winston.Logger)({
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
    })
  ]
});

//Create TCP Server
var server = net.createServer();
server.on('connection', handleConnection);
//Listening port
server.listen(8888, function() {
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

/*Debug lines
  console.log('Message:',message);
  console.log('Parsed:',parsedData);
  console.log('MessageType:',messageType);
*/
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
