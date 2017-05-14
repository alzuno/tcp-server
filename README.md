# tcp-server
## Simple TCP Socket 

 Includes +SACK:GTHBD for Queclink devices
 
 Alvaro Zuno

## Configuration file

 You have to set your setting on config.json

- serverName : THE SERVER NAME YOU WANT TO SHOW ON LOGS
- logglyToken : YOUR TOKEN FROM LOGGLY.COM
- logglySubdomain : YOUR SUBDOMAIN FROM LOGGLY.COM
- portNumber : LISTENING PORT NUMBER

For more information on Loggly.com and node.js logging: https://www.loggly.com/docs/node-js-logs/

## Requires

Winston logger -- https://github.com/winstonjs/winston

Winston Loggly Bulk -- https://github.com/loggly/winston-loggly-bulk/
