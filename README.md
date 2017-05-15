# tcp-server
## Simple TCP Socket 

 Includes +SACK:GTHBD for Queclink devices
 
 alzuno - 2017

## Configuration file

 First you have to set your settings on `config.json`:

- serverName : THE SERVER NAME YOU WANT TO SHOW ON LOGS (Ex. MyServer)
- logglyToken : YOUR [CUSTOMER TOKEN](https://www.loggly.com/docs/customer-token-authentication-token) FROM THE SOURCE SETUP PAGE OF https://www.loggly.com
- logglySubdomain : the subdomain of your Loggly account THE SUBDOMAIN OF YOUR https://www.loggly.com ACCOUNT
- portNumber : LISTENING PORT NUMBER 

For more information on Loggly and node.js logging: https://www.loggly.com/docs/node-js-logs/

## Requirements

To use tcp-server you need to install:

Winston logger -- https://github.com/winstonjs/winston
```
$ npm install winston
```
Winston Loggly Bulk -- https://github.com/loggly/winston-loggly-bulk/
```
$ npm install winston-loggly-bulk
```
Then run the server using
```
$ node tcp-server.js
```
Or see [SETUPASASERVICE](SETUPASASERVICE.md) to get instructions on running the tcp-server as a service on Linux.
