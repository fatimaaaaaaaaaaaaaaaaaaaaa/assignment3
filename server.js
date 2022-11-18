#!/usr/bin/env node

//dependencies
var app = require('./server/config/app');
var debug = require('debug')('webproject:server');
var http = require('http');

//store environment port in express
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//http server
var server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


//port into a number,string, true, or false
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //pipe
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


//event listener
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
