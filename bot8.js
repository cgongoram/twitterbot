console.log('The bot is starting');

var Twit = require('twit')

var config = require('./config.js');
 
var T = new Twit(config);

tweetIt();
setInterval(tweetIt,1000*60);

//tweetIt();

function tweetIt() {

	var hrTime = process.hrtime();
	var tweet = {

		status:'@cgongoram #cgongoram twit desde programa node.js en maquina escritorio ' + hrTime
	}
	// 
	//  tweet 'hello world!' 
	// 
	T.post('statuses/update', tweet, tweeted);	

	console.log(hrTime); 
}

function tweeted(err, data, response) {

	if(err) {
		console.log("Ocurrio un error: " + err);
		console.log("Data: " + data.user.location);
		console.log("Response: " + response.statusMessage);
	}
	else {
		console.log("Operacion exitosa!");
		console.log("Data: " + data.source);
		console.log("Response: " + response.statusMessage);
	}
}


// https://nodejs.org/api/http.html#http_http_incomingmessage
// ejemplos de elementos del objeto response

// Node.js v7.10.0 Documentation

// Index | View on single page | View as JSON
// Table of Contents

//     HTTP
//         Class: http.Agent
//             new Agent([options])
//             agent.createConnection(options[, callback])
//             agent.destroy()
//             agent.freeSockets
//             agent.getName(options)
//             agent.maxFreeSockets
//             agent.maxSockets
//             agent.requests
//             agent.sockets
//         Class: http.ClientRequest
//             Event: 'abort'
//             Event: 'aborted'
//             Event: 'connect'
//             Event: 'continue'
//             Event: 'response'
//             Event: 'socket'
//             Event: 'upgrade'
//             request.abort()
//             request.aborted
//             request.end([data][, encoding][, callback])
//             request.flushHeaders()
//             request.setNoDelay([noDelay])
//             request.setSocketKeepAlive([enable][, initialDelay])
//             request.setTimeout(timeout[, callback])
//             request.write(chunk[, encoding][, callback])
//         Class: http.Server
//             Event: 'checkContinue'
//             Event: 'checkExpectation'
//             Event: 'clientError'
//             Event: 'close'
//             Event: 'connect'
//             Event: 'connection'
//             Event: 'request'
//             Event: 'upgrade'
//             server.close([callback])
//             server.listen(handle[, callback])
//             server.listen(path[, callback])
//             server.listen([port][, hostname][, backlog][, callback])
//             server.listening
//             server.maxHeadersCount
//             server.setTimeout([msecs][, callback])
//             server.timeout
//         Class: http.ServerResponse
//             Event: 'close'
//             Event: 'finish'
//             response.addTrailers(headers)
//             response.end([data][, encoding][, callback])
//             response.finished
//             response.getHeader(name)
//             response.getHeaderNames()
//             response.getHeaders()
//             response.hasHeader(name)
//             response.headersSent
//             response.removeHeader(name)
//             response.sendDate
//             response.setHeader(name, value)
//             response.setTimeout(msecs[, callback])
//             response.statusCode
//             response.statusMessage
//             response.write(chunk[, encoding][, callback])
//             response.writeContinue()
//             response.writeHead(statusCode[, statusMessage][, headers])
//         Class: http.IncomingMessage
//             Event: 'aborted'
//             Event: 'close'
//             message.destroy([error])
//             message.headers
//             message.httpVersion
//             message.method
//             message.rawHeaders
//             message.rawTrailers
//             message.setTimeout(msecs, callback)
//             message.socket
//             message.statusCode
//             message.statusMessage
//             message.trailers
//             message.url
//         http.METHODS
//         http.STATUS_CODES
//         http.createServer([requestListener])
//         http.get(options[, callback])
//         http.globalAgent
//         http.request(options[, callback])

// HTTP
// #

// Stability: 2 - Stable

// To use the HTTP server and client one must require('http').

// The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses--the user is able to stream data.

// HTTP message headers are represented by an object like this:

// { 'content-length': '123',
//   'content-type': 'text/plain',
//   'connection': 'keep-alive',
//   'host': 'mysite.com',
//   'accept': '*/*' }

// Keys are lowercased. Values are not modified.

// In order to support the full spectrum of possible HTTP applications, Node.js's HTTP API is very low-level. It deals with stream handling and message parsing only. It parses a message into headers and body but it does not parse the actual headers or the body.

// See message.headers for details on how duplicate headers are handled.

// The raw headers as they were received are retained in the rawHeaders property, which is an array of [key, value, key2, value2, ...]. For example, the previous message header object might have a rawHeaders list like the following:

// [ 'ConTent-Length', '123456',
//   'content-LENGTH', '123',
//   'content-type', 'text/plain',
//   'CONNECTION', 'keep-alive',
//   'Host', 'mysite.com',
//   'accepT', '*/*' ]

// Class: http.Agent
// #
// Added in: v0.3.4

// An Agent is responsible for managing connection persistence and reuse for HTTP clients. It maintains a queue of pending requests for a given host and port, reusing a single socket connection for each until the queue is empty, at which time the socket is either destroyed or put into a pool where it is kept to be used again for requests to the same host and port. Whether it is destroyed or pooled depends on the keepAlive option.

// Pooled connections have TCP Keep-Alive enabled for them, but servers may still close idle connections, in which case they will be removed from the pool and a new connection will be made when a new HTTP request is made for that host and port. Servers may also refuse to allow multiple requests over the same connection, in which case the connection will have to be remade for every request and cannot be pooled. The Agent will still make the requests to that server, but each one will occur over a new connection.

// When a connection is closed by the client or the server, it is removed from the pool. Any unused sockets in the pool will be unrefed so as not to keep the Node.js process running when there are no outstanding requests. (see socket.unref()).

// It is good practice, to destroy() an Agent instance when it is no longer in use, because unused sockets consume OS resources.

// Sockets are removed from an agent's pool when the socket emits either a 'close' event or an 'agentRemove' event. When intending to keep one HTTP request open for a long time without keeping it in the pool, something like the following may be done:

// http.get(options, (res) => {
//   // Do stuff
// }).on('socket', (socket) => {
//   socket.emit('agentRemove');
// });

// An agent may also be used for an individual request. By providing {agent: false} as an option to the http.get() or http.request() functions, a one-time use Agent with default options will be used for the client connection.

// agent:false:

// http.get({
//   hostname: 'localhost',
//   port: 80,
//   path: '/',
//   agent: false  // create a new agent just for this one request
// }, (res) => {
//   // Do stuff with response
// });

// new Agent([options])
// #
// Added in: v0.3.4

//     options <Object> Set of configurable options to set on the agent. Can have the following fields:
//         keepAlive <boolean> Keep sockets around even when there are no outstanding requests, so they can be used for future requests without having to reestablish a TCP connection. Defaults to false
//         keepAliveMsecs <number> When using the keepAlive option, specifies the initial delay for TCP Keep-Alive packets. Ignored when the keepAlive option is false or undefined. Defaults to 1000.
//         maxSockets <number> Maximum number of sockets to allow per host. Defaults to Infinity.
//         maxFreeSockets <number> Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Defaults to 256.

// The default http.globalAgent that is used by http.request() has all of these values set to their respective defaults.

// To configure any of them, a custom http.Agent instance must be created.

// const http = require('http');
// const keepAliveAgent = new http.Agent({ keepAlive: true });
// options.agent = keepAliveAgent;
// http.request(options, onResponseCallback);

// agent.createConnection(options[, callback])
// #
// Added in: v0.11.4

//     options <Object> Options containing connection details. Check net.createConnection() for the format of the options
//     callback <Function> Callback function that receives the created socket
//     Returns: <net.Socket>

// Produces a socket/stream to be used for HTTP requests.

// By default, this function is the same as net.createConnection(). However, custom agents may override this method in case greater flexibility is desired.

// A socket/stream can be supplied in one of two ways: by returning the socket/stream from this function, or by passing the socket/stream to callback.

// callback has a signature of (err, stream).
// agent.destroy()
// #
// Added in: v0.11.4

// Destroy any sockets that are currently in use by the agent.

// It is usually not necessary to do this. However, if using an agent with keepAlive enabled, then it is best to explicitly shut down the agent when it will no longer be used. Otherwise, sockets may hang open for quite a long time before the server terminates them.
// agent.freeSockets
// #
// Added in: v0.11.4

//     <Object>

// An object which contains arrays of sockets currently awaiting use by the agent when keepAlive is enabled. Do not modify.
// agent.getName(options)
// #
// Added in: v0.11.4

//     options <Object> A set of options providing information for name generation
//         host <string> A domain name or IP address of the server to issue the request to
//         port <number> Port of remote server
//         localAddress <string> Local interface to bind for network connections when issuing the request
//     Returns: <string>

// Get a unique name for a set of request options, to determine whether a connection can be reused. For an HTTP agent, this returns host:port:localAddress. For an HTTPS agent, the name includes the CA, cert, ciphers, and other HTTPS/TLS-specific options that determine socket reusability.
// agent.maxFreeSockets
// #
// Added in: v0.11.7

//     <number>

// By default set to 256. For agents with keepAlive enabled, this sets the maximum number of sockets that will be left open in the free state.
// agent.maxSockets
// #
// Added in: v0.3.6

//     <number>

// By default set to Infinity. Determines how many concurrent sockets the agent can have open per origin. Origin is either a 'host:port' or 'host:port:localAddress' combination.
// agent.requests
// #
// Added in: v0.5.9

//     <Object>

// An object which contains queues of requests that have not yet been assigned to sockets. Do not modify.
// agent.sockets
// #
// Added in: v0.3.6

//     <Object>

// An object which contains arrays of sockets currently in use by the agent. Do not modify.
// Class: http.ClientRequest
// #
// Added in: v0.1.17

// This object is created internally and returned from http.request(). It represents an in-progress request whose header has already been queued. The header is still mutable using the setHeader(name, value), getHeader(name), removeHeader(name) API. The actual header will be sent along with the first data chunk or when closing the connection.

// To get the response, add a listener for 'response' to the request object. 'response' will be emitted from the request object when the response headers have been received. The 'response' event is executed with one argument which is an instance of http.IncomingMessage.

// During the 'response' event, one can add listeners to the response object; particularly to listen for the 'data' event.

// If no 'response' handler is added, then the response will be entirely discarded. However, if a 'response' event handler is added, then the data from the response object must be consumed, either by calling response.read() whenever there is a 'readable' event, or by adding a 'data' handler, or by calling the .resume() method. Until the data is consumed, the 'end' event will not fire. Also, until the data is read it will consume memory that can eventually lead to a 'process out of memory' error.

// Note: Node.js does not check whether Content-Length and the length of the body which has been transmitted are equal or not.

// The request implements the Writable Stream interface. This is an EventEmitter with the following events:
// Event: 'abort'
// #
// Added in: v1.4.1

// Emitted when the request has been aborted by the client. This event is only emitted on the first call to abort().
// Event: 'aborted'
// #
// Added in: v0.3.8

// Emitted when the request has been aborted by the server and the network socket has closed.
// Event: 'connect'
// #
// Added in: v0.7.0

//     response <http.IncomingMessage>
//     socket <net.Socket>
//     head <Buffer>

// Emitted each time a server responds to a request with a CONNECT method. If this event is not being listened for, clients receiving a CONNECT method will have their connections closed.

// A client and server pair demonstrating how to listen for the 'connect' event:

// const http = require('http');
// const net = require('net');
// const url = require('url');

// // Create an HTTP tunneling proxy
// const proxy = http.createServer( (req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('okay');
// });
// proxy.on('connect', (req, cltSocket, head) => {
//   // connect to an origin server
//   const srvUrl = url.parse(`http://${req.url}`);
//   const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
//     cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
//                     'Proxy-agent: Node.js-Proxy\r\n' +
//                     '\r\n');
//     srvSocket.write(head);
//     srvSocket.pipe(cltSocket);
//     cltSocket.pipe(srvSocket);
//   });
// });

// // now that proxy is running
// proxy.listen(1337, '127.0.0.1', () => {

//   // make a request to a tunneling proxy
//   const options = {
//     port: 1337,
//     hostname: '127.0.0.1',
//     method: 'CONNECT',
//     path: 'www.google.com:80'
//   };

//   const req = http.request(options);
//   req.end();

//   req.on('connect', (res, socket, head) => {
//     console.log('got connected!');

//     // make a request over an HTTP tunnel
//     socket.write('GET / HTTP/1.1\r\n' +
//                  'Host: www.google.com:80\r\n' +
//                  'Connection: close\r\n' +
//                  '\r\n');
//     socket.on('data', (chunk) => {
//       console.log(chunk.toString());
//     });
//     socket.on('end', () => {
//       proxy.close();
//     });
//   });
// });

// Event: 'continue'
// #
// Added in: v0.3.2

// Emitted when the server sends a '100 Continue' HTTP response, usually because the request contained 'Expect: 100-continue'. This is an instruction that the client should send the request body.
// Event: 'response'
// #
// Added in: v0.1.0

//     response <http.IncomingMessage>

// Emitted when a response is received to this request. This event is emitted only once.
// Event: 'socket'
// #
// Added in: v0.5.3

//     socket <net.Socket>

// Emitted after a socket is assigned to this request.
// Event: 'upgrade'
// #
// Added in: v0.1.94

//     response <http.IncomingMessage>
//     socket <net.Socket>
//     head <Buffer>

// Emitted each time a server responds to a request with an upgrade. If this event is not being listened for, clients receiving an upgrade header will have their connections closed.

// A client server pair demonstrating how to listen for the 'upgrade' event.

// const http = require('http');

// // Create an HTTP server
// const srv = http.createServer( (req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('okay');
// });
// srv.on('upgrade', (req, socket, head) => {
//   socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
//                'Upgrade: WebSocket\r\n' +
//                'Connection: Upgrade\r\n' +
//                '\r\n');

//   socket.pipe(socket); // echo back
// });

// // now that server is running
// srv.listen(1337, '127.0.0.1', () => {

//   // make a request
//   const options = {
//     port: 1337,
//     hostname: '127.0.0.1',
//     headers: {
//       'Connection': 'Upgrade',
//       'Upgrade': 'websocket'
//     }
//   };

//   const req = http.request(options);
//   req.end();

//   req.on('upgrade', (res, socket, upgradeHead) => {
//     console.log('got upgraded!');
//     socket.end();
//     process.exit(0);
//   });
// });

// request.abort()
// #
// Added in: v0.3.8

// Marks the request as aborting. Calling this will cause remaining data in the response to be dropped and the socket to be destroyed.
// request.aborted
// #
// Added in: v0.11.14

// If a request has been aborted, this value is the time when the request was aborted, in milliseconds since 1 January 1970 00:00:00 UTC.
// request.end([data][, encoding][, callback])
// #
// Added in: v0.1.90

//     data <string> | <Buffer>
//     encoding <string>
//     callback <Function>

// Finishes sending the request. If any parts of the body are unsent, it will flush them to the stream. If the request is chunked, this will send the terminating '0\r\n\r\n'.

// If data is specified, it is equivalent to calling response.write(data, encoding) followed by request.end(callback).

// If callback is specified, it will be called when the request stream is finished.
// request.flushHeaders()
// #
// Added in: v1.6.0

// Flush the request headers.

// For efficiency reasons, Node.js normally buffers the request headers until request.end() is called or the first chunk of request data is written. It then tries to pack the request headers and data into a single TCP packet.

// That's usually desired (it saves a TCP round-trip), but not when the first data is not sent until possibly much later. request.flushHeaders() bypasses the optimization and kickstarts the request.
// request.setNoDelay([noDelay])
// #
// Added in: v0.5.9

//     noDelay <boolean>

// Once a socket is assigned to this request and is connected socket.setNoDelay() will be called.
// request.setSocketKeepAlive([enable][, initialDelay])
// #
// Added in: v0.5.9

//     enable <boolean>
//     initialDelay <number>

// Once a socket is assigned to this request and is connected socket.setKeepAlive() will be called.
// request.setTimeout(timeout[, callback])
// #
// Added in: v0.5.9

//     timeout <number> Milliseconds before a request is considered to be timed out.
//     callback <Function> Optional function to be called when a timeout occurs. Same as binding to the timeout event.

// Once a socket is assigned to this request and is connected socket.setTimeout() will be called.

// Returns request.
// request.write(chunk[, encoding][, callback])
// #
// Added in: v0.1.29

//     chunk <string> | <Buffer>
//     encoding <string>
//     callback <Function>

// Sends a chunk of the body. By calling this method many times, a request body can be sent to a server--in that case it is suggested to use the ['Transfer-Encoding', 'chunked'] header line when creating the request.

// The encoding argument is optional and only applies when chunk is a string. Defaults to 'utf8'.

// The callback argument is optional and will be called when this chunk of data is flushed.

// Returns request.
// Class: http.Server
// #
// Added in: v0.1.17

// This class inherits from net.Server and has the following additional events:
// Event: 'checkContinue'
// #
// Added in: v0.3.0

//     request <http.IncomingMessage>
//     response <http.ServerResponse>

// Emitted each time a request with an HTTP Expect: 100-continue is received. If this event is not listened for, the server will automatically respond with a 100 Continue as appropriate.

// Handling this event involves calling response.writeContinue() if the client should continue to send the request body, or generating an appropriate HTTP response (e.g. 400 Bad Request) if the client should not continue to send the request body.

// Note that when this event is emitted and handled, the 'request' event will not be emitted.
// Event: 'checkExpectation'
// #
// Added in: v5.5.0

//     request <http.ClientRequest>
//     response <http.ServerResponse>

// Emitted each time a request with an HTTP Expect header is received, where the value is not 100-continue. If this event is not listened for, the server will automatically respond with a 417 Expectation Failed as appropriate.

// Note that when this event is emitted and handled, the 'request' event will not be emitted.
// Event: 'clientError'
// #
// History

//     exception <Error>
//     socket <net.Socket>

// If a client connection emits an 'error' event, it will be forwarded here. Listener of this event is responsible for closing/destroying the underlying socket. For example, one may wish to more gracefully close the socket with an HTTP '400 Bad Request' response instead of abruptly severing the connection.

// Default behavior is to destroy the socket immediately on malformed request.

// socket is the net.Socket object that the error originated from.

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end();
// });
// server.on('clientError', (err, socket) => {
//   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });
// server.listen(8000);

// When the 'clientError' event occurs, there is no request or response object, so any HTTP response sent, including response headers and payload, must be written directly to the socket object. Care must be taken to ensure the response is a properly formatted HTTP response message.
// Event: 'close'
// #
// Added in: v0.1.4

// Emitted when the server closes.
// Event: 'connect'
// #
// Added in: v0.7.0

//     request <http.IncomingMessage> Arguments for the HTTP request, as it is in the 'request' event
//     socket <net.Socket> Network socket between the server and client
//     head <Buffer> The first packet of the tunneling stream (may be empty)

// Emitted each time a client requests an HTTP CONNECT method. If this event is not listened for, then clients requesting a CONNECT method will have their connections closed.

// After this event is emitted, the request's socket will not have a 'data' event listener, meaning it will need to be bound in order to handle data sent to the server on that socket.
// Event: 'connection'
// #
// Added in: v0.1.0

//     socket <net.Socket>

// When a new TCP stream is established. socket is an object of type net.Socket. Usually users will not want to access this event. In particular, the socket will not emit 'readable' events because of how the protocol parser attaches to the socket. The socket can also be accessed at request.connection.
// Event: 'request'
// #
// Added in: v0.1.0

//     request <http.IncomingMessage>
//     response <http.ServerResponse>

// Emitted each time there is a request. Note that there may be multiple requests per connection (in the case of HTTP Keep-Alive connections).
// Event: 'upgrade'
// #
// Added in: v0.1.94

//     request <http.IncomingMessage> Arguments for the HTTP request, as it is in the 'request' event
//     socket <net.Socket> Network socket between the server and client
//     head <Buffer> The first packet of the upgraded stream (may be empty)

// Emitted each time a client requests an HTTP upgrade. If this event is not listened for, then clients requesting an upgrade will have their connections closed.

// After this event is emitted, the request's socket will not have a 'data' event listener, meaning it will need to be bound in order to handle data sent to the server on that socket.
// server.close([callback])
// #
// Added in: v0.1.90

//     callback <Function>

// Stops the server from accepting new connections. See net.Server.close().
// server.listen(handle[, callback])
// #
// Added in: v0.5.10

//     handle <Object>
//     callback <Function>

// The handle object can be set to either a server or socket (anything with an underlying _handle member), or a {fd: <n>} object.

// This will cause the server to accept connections on the specified handle, but it is presumed that the file descriptor or handle has already been bound to a port or domain socket.

// Listening on a file descriptor is not supported on Windows.

// This function is asynchronous. callback will be added as a listener for the 'listening' event. See also net.Server.listen().

// Returns server.

// Note: The server.listen() method may be called multiple times. Each subsequent call will re-open the server using the provided options.
// server.listen(path[, callback])
// #
// Added in: v0.1.90

//     path <string>
//     callback <Function>

// Start a UNIX socket server listening for connections on the given path.

// This function is asynchronous. callback will be added as a listener for the 'listening' event. See also net.Server.listen(path).

// Note: The server.listen() method may be called multiple times. Each subsequent call will re-open the server using the provided options.
// server.listen([port][, hostname][, backlog][, callback])
// #
// Added in: v0.1.90

//     port <number>
//     hostname <string>
//     backlog <number>
//     callback <Function>

// Begin accepting connections on the specified port and hostname. If the hostname is omitted, the server will accept connections on the unspecified IPv6 address (::) when IPv6 is available, or the unspecified IPv4 address (0.0.0.0) otherwise.

// Note: in most operating systems, listening to the unspecified IPv6 address (::) may cause the net.Server to also listen on the unspecified IPv4 address (0.0.0.0).

// Omit the port argument, or use a port value of 0, to have the operating system assign a random port, which can be retrieved by using server.address().port after the 'listening' event has been emitted.

// To listen to a unix socket, supply a filename instead of port and hostname.

// backlog is the maximum length of the queue of pending connections. The actual length will be determined by the OS through sysctl settings such as tcp_max_syn_backlog and somaxconn on linux. The default value of this parameter is 511 (not 512).

// This function is asynchronous. callback will be added as a listener for the 'listening' event. See also net.Server.listen(port).

// Note: The server.listen() method may be called multiple times. Each subsequent call will re-open the server using the provided options.
// server.listening
// #
// Added in: v5.7.0

//     <boolean>

// A Boolean indicating whether or not the server is listening for connections.
// server.maxHeadersCount
// #
// Added in: v0.7.0

//     <number> Defaults to 2000.

// Limits maximum incoming headers count, equal to 2000 by default. If set to 0 - no limit will be applied.
// server.setTimeout([msecs][, callback])
// #
// Added in: v0.9.12

//     msecs <number> Defaults to 120000 (2 minutes).
//     callback <Function>

// Sets the timeout value for sockets, and emits a 'timeout' event on the Server object, passing the socket as an argument, if a timeout occurs.

// If there is a 'timeout' event listener on the Server object, then it will be called with the timed-out socket as an argument.

// By default, the Server's timeout value is 2 minutes, and sockets are destroyed automatically if they time out. However, if a callback is assigned to the Server's 'timeout' event, timeouts must be handled explicitly.

// Returns server.
// server.timeout
// #
// Added in: v0.9.12

//     <number> Defaults to 120000 (2 minutes).

// The number of milliseconds of inactivity before a socket is presumed to have timed out.

// Note that the socket timeout logic is set up on connection, so changing this value only affects new connections to the server, not any existing connections.

// Set to 0 to disable any kind of automatic timeout behavior on incoming connections.
// Class: http.ServerResponse
// #
// Added in: v0.1.17

// This object is created internally by an HTTP server--not by the user. It is passed as the second parameter to the 'request' event.

// The response implements, but does not inherit from, the Writable Stream interface. This is an EventEmitter with the following events:
// Event: 'close'
// #
// Added in: v0.6.7

// Indicates that the underlying connection was terminated before response.end() was called or able to flush.
// Event: 'finish'
// #
// Added in: v0.3.6

// Emitted when the response has been sent. More specifically, this event is emitted when the last segment of the response headers and body have been handed off to the operating system for transmission over the network. It does not imply that the client has received anything yet.

// After this event, no more events will be emitted on the response object.
// response.addTrailers(headers)
// #
// Added in: v0.3.0

//     headers <Object>

// This method adds HTTP trailing headers (a header but at the end of the message) to the response.

// Trailers will only be emitted if chunked encoding is used for the response; if it is not (e.g. if the request was HTTP/1.0), they will be silently discarded.

// Note that HTTP requires the Trailer header to be sent in order to emit trailers, with a list of the header fields in its value. E.g.,

// response.writeHead(200, { 'Content-Type': 'text/plain',
//                           'Trailer': 'Content-MD5' });
// response.write(fileData);
// response.addTrailers({'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667'});
// response.end();

// Attempting to set a header field name or value that contains invalid characters will result in a TypeError being thrown.
// response.end([data][, encoding][, callback])
// #
// Added in: v0.1.90

//     data <string> | <Buffer>
//     encoding <string>
//     callback <Function>

// This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.

// If data is specified, it is equivalent to calling response.write(data, encoding) followed by response.end(callback).

// If callback is specified, it will be called when the response stream is finished.
// response.finished
// #
// Added in: v0.0.2

//     <boolean>

// Boolean value that indicates whether the response has completed. Starts as false. After response.end() executes, the value will be true.
// response.getHeader(name)
// #
// Added in: v0.4.0

//     name <string>
//     Returns: <string>

// Reads out a header that's already been queued but not sent to the client. Note that the name is case insensitive.

// Example:

// const contentType = response.getHeader('content-type');

// response.getHeaderNames()
// #
// Added in: v7.7.0

//     Returns: <Array>

// Returns an array containing the unique names of the current outgoing headers. All header names are lowercase.

// Example:

// response.setHeader('Foo', 'bar');
// response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

// const headerNames = response.getHeaderNames();
// // headerNames === ['foo', 'set-cookie']

// response.getHeaders()
// #
// Added in: v7.7.0

//     Returns: <Object>

// Returns a shallow copy of the current outgoing headers. Since a shallow copy is used, array values may be mutated without additional calls to various header-related http module methods. The keys of the returned object are the header names and the values are the respective header values. All header names are lowercase.

// Example:

// response.setHeader('Foo', 'bar');
// response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

// const headers = response.getHeaders();
// // headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }

// response.hasHeader(name)
// #
// Added in: v7.7.0

//     name <string>
//     Returns: <boolean>

// Returns true if the header identified by name is currently set in the outgoing headers. Note that the header name matching is case-insensitive.

// Example:

// const hasContentType = response.hasHeader('content-type');

// response.headersSent
// #
// Added in: v0.9.3

//     <boolean>

// Boolean (read-only). True if headers were sent, false otherwise.
// response.removeHeader(name)
// #
// Added in: v0.4.0

//     name <string>

// Removes a header that's queued for implicit sending.

// Example:

// response.removeHeader('Content-Encoding');

// response.sendDate
// #
// Added in: v0.7.5

//     <boolean>

// When true, the Date header will be automatically generated and sent in the response if it is not already present in the headers. Defaults to true.

// This should only be disabled for testing; HTTP requires the Date header in responses.
// response.setHeader(name, value)
// #
// Added in: v0.4.0

//     name <string>
//     value <string> | <string[]>

// Sets a single header value for implicit headers. If this header already exists in the to-be-sent headers, its value will be replaced. Use an array of strings here to send multiple headers with the same name.

// Example:

// response.setHeader('Content-Type', 'text/html');

// or

// response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

// Attempting to set a header field name or value that contains invalid characters will result in a TypeError being thrown.

// When headers have been set with response.setHeader(), they will be merged with any headers passed to response.writeHead(), with the headers passed to response.writeHead() given precedence.

// // returns content-type = text/plain
// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('X-Foo', 'bar');
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('ok');
// });

// response.setTimeout(msecs[, callback])
// #
// Added in: v0.9.12

//     msecs <number>
//     callback <Function>

// Sets the Socket's timeout value to msecs. If a callback is provided, then it is added as a listener on the 'timeout' event on the response object.

// If no 'timeout' listener is added to the request, the response, or the server, then sockets are destroyed when they time out. If a handler is assigned to the request, the response, or the server's 'timeout' events, timed out sockets must be handled explicitly.

// Returns response.
// response.statusCode
// #
// Added in: v0.4.0

//     <number>

// When using implicit headers (not calling response.writeHead() explicitly), this property controls the status code that will be sent to the client when the headers get flushed.

// Example:

// response.statusCode = 404;

// After response header was sent to the client, this property indicates the status code which was sent out.
// response.statusMessage
// #
// Added in: v0.11.8

//     <string>

// When using implicit headers (not calling response.writeHead() explicitly), this property controls the status message that will be sent to the client when the headers get flushed. If this is left as undefined then the standard message for the status code will be used.

// Example:

// response.statusMessage = 'Not found';

// After response header was sent to the client, this property indicates the status message which was sent out.
// response.write(chunk[, encoding][, callback])
// #
// Added in: v0.1.29

//     chunk <string> | <Buffer>
//     encoding <string>
//     callback <Function>
//     Returns: <boolean>

// If this method is called and response.writeHead() has not been called, it will switch to implicit header mode and flush the implicit headers.

// This sends a chunk of the response body. This method may be called multiple times to provide successive parts of the body.

// Note that in the http module, the response body is omitted when the request is a HEAD request. Similarly, the 204 and 304 responses must not include a message body.

// chunk can be a string or a buffer. If chunk is a string, the second parameter specifies how to encode it into a byte stream. By default the encoding is 'utf8'. callback will be called when this chunk of data is flushed.

// Note: This is the raw HTTP body and has nothing to do with higher-level multi-part body encodings that may be used.

// The first time response.write() is called, it will send the buffered header information and the first chunk of the body to the client. The second time response.write() is called, Node.js assumes data will be streamed, and sends the new data separately. That is, the response is buffered up to the first chunk of the body.

// Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again.
// response.writeContinue()
// #
// Added in: v0.3.0

// Sends a HTTP/1.1 100 Continue message to the client, indicating that the request body should be sent. See the 'checkContinue' event on Server.
// response.writeHead(statusCode[, statusMessage][, headers])
// #
// History

//     statusCode <number>
//     statusMessage <string>
//     headers <Object>

// Sends a response header to the request. The status code is a 3-digit HTTP status code, like 404. The last argument, headers, are the response headers. Optionally one can give a human-readable statusMessage as the second argument.

// Example:

// const body = 'hello world';
// response.writeHead(200, {
//   'Content-Length': Buffer.byteLength(body),
//   'Content-Type': 'text/plain' });

// This method must only be called once on a message and it must be called before response.end() is called.

// If response.write() or response.end() are called before calling this, the implicit/mutable headers will be calculated and call this function.

// When headers have been set with response.setHeader(), they will be merged with any headers passed to response.writeHead(), with the headers passed to response.writeHead() given precedence.

// // returns content-type = text/plain
// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('X-Foo', 'bar');
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('ok');
// });

// Note that Content-Length is given in bytes not characters. The above example works because the string 'hello world' contains only single byte characters. If the body contains higher coded characters then Buffer.byteLength() should be used to determine the number of bytes in a given encoding. And Node.js does not check whether Content-Length and the length of the body which has been transmitted are equal or not.

// Attempting to set a header field name or value that contains invalid characters will result in a TypeError being thrown.
// Class: http.IncomingMessage
// #
// Added in: v0.1.17

// An IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data.

// It implements the Readable Stream interface, as well as the following additional events, methods, and properties.
// Event: 'aborted'
// #
// Added in: v0.3.8

// Emitted when the request has been aborted by the client and the network socket has closed.
// Event: 'close'
// #
// Added in: v0.4.2

// Indicates that the underlying connection was closed. Just like 'end', this event occurs only once per response.
// message.destroy([error])
// #
// Added in: v0.3.0

//     error <Error>

// Calls destroy() on the socket that received the IncomingMessage. If error is provided, an 'error' event is emitted and error is passed as an argument to any listeners on the event.
// message.headers
// #
// Added in: v0.1.5

//     <Object>

// The request/response headers object.

// Key-value pairs of header names and values. Header names are lower-cased. Example:

// // Prints something like:
// //
// // { 'user-agent': 'curl/7.22.0',
// //   host: '127.0.0.1:8000',
// //   accept: '*/*' }
// console.log(request.headers);

// Duplicates in raw headers are handled in the following ways, depending on the header name:

//     Duplicates of age, authorization, content-length, content-type, etag, expires, from, host, if-modified-since, if-unmodified-since, last-modified, location, max-forwards, proxy-authorization, referer, retry-after, or user-agent are discarded.
//     set-cookie is always an array. Duplicates are added to the array.
//     For all other headers, the values are joined together with ', '.

// message.httpVersion
// #
// Added in: v0.1.1

//     <string>

// In case of server request, the HTTP version sent by the client. In the case of client response, the HTTP version of the connected-to server. Probably either '1.1' or '1.0'.

// Also message.httpVersionMajor is the first integer and message.httpVersionMinor is the second.
// message.method
// #
// Added in: v0.1.1

//     <string>

// Only valid for request obtained from http.Server.

// The request method as a string. Read only. Example: 'GET', 'DELETE'.
// message.rawHeaders
// #
// Added in: v0.11.6

//     <Array>

// The raw request/response headers list exactly as they were received.

// Note that the keys and values are in the same list. It is not a list of tuples. So, the even-numbered offsets are key values, and the odd-numbered offsets are the associated values.

// Header names are not lowercased, and duplicates are not merged.

// // Prints something like:
// //
// // [ 'user-agent',
// //   'this is invalid because there can be only one',
// //   'User-Agent',
// //   'curl/7.22.0',
// //   'Host',
// //   '127.0.0.1:8000',
// //   'ACCEPT',
// //   '*/*' ]
// console.log(request.rawHeaders);

// message.rawTrailers
// #
// Added in: v0.11.6

//     <Array>

// The raw request/response trailer keys and values exactly as they were received. Only populated at the 'end' event.
// message.setTimeout(msecs, callback)
// #
// Added in: v0.5.9

//     msecs <number>
//     callback <Function>

// Calls message.connection.setTimeout(msecs, callback).

// Returns message.
// message.socket
// #
// Added in: v0.3.0

//     <net.Socket>

// The net.Socket object associated with the connection.

// With HTTPS support, use request.socket.getPeerCertificate() to obtain the client's authentication details.
// message.statusCode
// #
// Added in: v0.1.1

//     <number>

// Only valid for response obtained from http.ClientRequest.

// The 3-digit HTTP response status code. E.G. 404.
// message.statusMessage
// #
// Added in: v0.11.10

//     <string>

// Only valid for response obtained from http.ClientRequest.

// The HTTP response status message (reason phrase). E.G. OK or Internal Server Error.
// message.trailers
// #
// Added in: v0.3.0

//     <Object>

// The request/response trailers object. Only populated at the 'end' event.
// message.url
// #
// Added in: v0.1.90

//     <string>

// Only valid for request obtained from http.Server.

// Request URL string. This contains only the URL that is present in the actual HTTP request. If the request is:

// GET /status?name=ryan HTTP/1.1\r\n
// Accept: text/plain\r\n
// \r\n

// Then request.url will be:

// '/status?name=ryan'

// To parse the url into its parts require('url').parse(request.url) can be used. Example:

// $ node
// > require('url').parse('/status?name=ryan')
// Url {
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '?name=ryan',
//   query: 'name=ryan',
//   pathname: '/status',
//   path: '/status?name=ryan',
//   href: '/status?name=ryan' }

// To extract the parameters from the query string, the require('querystring').parse function can be used, or true can be passed as the second argument to require('url').parse. Example:

// $ node
// > require('url').parse('/status?name=ryan', true)
// Url {
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '?name=ryan',
//   query: { name: 'ryan' },
//   pathname: '/status',
//   path: '/status?name=ryan',
//   href: '/status?name=ryan' }

// http.METHODS
// #
// Added in: v0.11.8

//     <Array>

// A list of the HTTP methods that are supported by the parser.
// http.STATUS_CODES
// #
// Added in: v0.1.22

//     <Object>

// A collection of all the standard HTTP response status codes, and the short description of each. For example, http.STATUS_CODES[404] === 'Not Found'.
// http.createServer([requestListener])
// #
// Added in: v0.1.13

//     requestListener <Function>

//     Returns: <http.Server>

// Returns a new instance of http.Server.

// The requestListener is a function which is automatically added to the 'request' event.
// http.get(options[, callback])
// #
// Added in: v0.3.6

//     options <Object> | <string> Accepts the same options as http.request(), with the method always set to GET. Properties that are inherited from the prototype are ignored.
//     callback <Function>
//     Returns: <http.ClientRequest>

// Since most requests are GET requests without bodies, Node.js provides this convenience method. The only difference between this method and http.request() is that it sets the method to GET and calls req.end() automatically. Note that response data must be consumed in the callback for reasons stated in http.ClientRequest section.

// The callback is invoked with a single argument that is an instance of http.IncomingMessage

// JSON Fetching Example:

// http.get('http://nodejs.org/dist/index.json', (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];

//   let error;
//   if (statusCode !== 200) {
//     error = new Error(`Request Failed.\n` +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error(`Invalid content-type.\n` +
//                       `Expected application/json but received ${contentType}`);
//   }
//   if (error) {
//     console.error(error.message);
//     // consume response data to free up memory
//     res.resume();
//     return;
//   }

//   res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => { rawData += chunk; });
//   res.on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.error(`Got error: ${e.message}`);
// });

// http.globalAgent
// #
// Added in: v0.5.9

//     <http.Agent>

// Global instance of Agent which is used as the default for all HTTP client requests.
// http.request(options[, callback])
// #
// Added in: v0.3.6

//     options <Object> | <string>
//         protocol <string> Protocol to use. Defaults to http:.
//         host <string> A domain name or IP address of the server to issue the request to. Defaults to localhost.
//         hostname <string> Alias for host. To support url.parse(), hostname is preferred over host.
//         family <number> IP address family to use when resolving host and hostname. Valid values are 4 or 6. When unspecified, both IP v4 and v6 will be used.
//         port <number> Port of remote server. Defaults to 80.
//         localAddress <string> Local interface to bind for network connections.
//         socketPath <string> Unix Domain Socket (use one of host:port or socketPath).
//         method <string> A string specifying the HTTP request method. Defaults to 'GET'.
//         path <string> Request path. Defaults to '/'. Should include query string if any. E.G. '/index.html?page=12'. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future.
//         headers <Object> An object containing request headers.
//         auth <string> Basic authentication i.e. 'user:password' to compute an Authorization header.
//         agent <http.Agent> | <boolean> Controls Agent behavior. Possible values:
//             undefined (default): use http.globalAgent for this host and port.
//             Agent object: explicitly use the passed in Agent.
//             false: causes a new Agent with default values to be used.
//         createConnection <Function> A function that produces a socket/stream to use for the request when the agent option is not used. This can be used to avoid creating a custom Agent class just to override the default createConnection function. See agent.createConnection() for more details.
//         timeout <number>: A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected.
//     callback <Function>
//     Returns: <http.ClientRequest>

// Node.js maintains several connections per server to make HTTP requests. This function allows one to transparently issue requests.

// options can be an object or a string. If options is a string, it is automatically parsed with url.parse().

// The optional callback parameter will be added as a one time listener for the 'response' event.

// http.request() returns an instance of the http.ClientRequest class. The ClientRequest instance is a writable stream. If one needs to upload a file with a POST request, then write to the ClientRequest object.

// Example:

// const postData = querystring.stringify({
//   'msg': 'Hello World!'
// });

// const options = {
//   hostname: 'www.google.com',
//   port: 80,
//   path: '/upload',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(postData)
//   }
// };

// const req = http.request(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('No more data in response.');
//   });
// });

// req.on('error', (e) => {
//   console.error(`problem with request: ${e.message}`);
// });

// // write data to request body
// req.write(postData);
// req.end();

// Note that in the example req.end() was called. With http.request() one must always call req.end() to signify the end of the request - even if there is no data being written to the request body.

// If any error is encountered during the request (be that with DNS resolution, TCP level errors, or actual HTTP parse errors) an 'error' event is emitted on the returned request object. As with all 'error' events, if no listeners are registered the error will be thrown.

// There are a few special headers that should be noted.

//     Sending a 'Connection: keep-alive' will notify Node.js that the connection to the server should be persisted until the next request.

//     Sending a 'Content-Length' header will disable the default chunked encoding.

//     Sending an 'Expect' header will immediately send the request headers. Usually, when sending 'Expect: 100-continue', both a timeout and a listener for the continue event should be set. See RFC2616 Section 8.2.3 for more information.

//     Sending an Authorization header will override using the auth option to compute basic authentication.




//  ejemplos de elementos del objeto DATA
//  https://dev.twitter.com/rest/reference/post/statuses/update
// {
//   "coordinates": null,
//   "favorited": false,
//   "created_at": "Wed Sep 05 00:37:15 +0000 2012",
//   "truncated": false,
//   "id_str": "243145735212777472",
//   "entities": {
//     "urls": [

//     ],
//     "hashtags": [
//       {
//         "text": "peterfalk",
//         "indices": [
//           35,
//           45
//         ]
//       }
//     ],
//     "user_mentions": [

//     ]
//   },
//   "in_reply_to_user_id_str": null,
//   "text": "Maybe he'll finally find his keys. #peterfalk",
//   "contributors": null,
//   "retweet_count": 0,
//   "id": 243145735212777472,
//   "in_reply_to_status_id_str": null,
//   "geo": null,
//   "retweeted": false,
//   "in_reply_to_user_id": null,
//   "place": null,
//   "user": {
//     "name": "Jason Costa",
//     "profile_sidebar_border_color": "86A4A6",
//     "profile_sidebar_fill_color": "A0C5C7",
//     "profile_background_tile": false,
//     "profile_image_url": "http://a0.twimg.com/profile_images/1751674923/new_york_beard_normal.jpg",
//     "created_at": "Wed May 28 00:20:15 +0000 2008",
//     "location": "",
//     "is_translator": true,
//     "follow_request_sent": false,
//     "id_str": "14927800",
//     "profile_link_color": "FF3300",
//     "entities": {
//       "url": {
//         "urls": [
//           {
//             "expanded_url": "http://www.jason-costa.blogspot.com/",
//             "url": "http://t.co/YCA3ZKY",
//             "indices": [
//               0,
//               19
//             ],
//             "display_url": "jason-costa.blogspot.com"
//           }
//         ]
//       },
//       "description": {
//         "urls": [

//         ]
//       }
//     },
//     "default_profile": false,
//     "contributors_enabled": false,
//     "url": "http://t.co/YCA3ZKY",
//     "favourites_count": 883,
//     "utc_offset": -28800,
//     "id": 14927800,
//     "profile_image_url_https": "https://si0.twimg.com/profile_images/1751674923/new_york_beard_normal.jpg",
//     "profile_use_background_image": true,
//     "listed_count": 150,
//     "profile_text_color": "333333",
//     "protected": false,
//     "lang": "en",
//     "followers_count": 8760,
//     "time_zone": "Pacific Time (US & Canada)",
//     "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme6/bg.gif",
//     "verified": false,
//     "profile_background_color": "709397",
//     "notifications": false,
//     "description": "Platform at Twitter",
//     "geo_enabled": true,
//     "statuses_count": 5532,
//     "default_profile_image": false,
//     "friends_count": 166,
//     "profile_background_image_url": "http://a0.twimg.com/images/themes/theme6/bg.gif",
//     "show_all_inline_media": true,
//     "screen_name": "jasoncosta",
//     "following": false
//   },
//   "source": "My Shiny App",
//   "in_reply_to_screen_name": null,
//   "in_reply_to_status_id": null
// }