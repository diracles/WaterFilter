var serialport = require("serialport"),
	SerialPort = serialport.SerialPort;
	//website stuff
	app = require('express')(),
	//attaching server to the app, attaches the server to the server we created
	//server is attached to app
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	portName = process.argv[2];

	io.set('log level', 1);
	server.listen(8090);
	console.log("listening");

	var arduino = new SerialPort(portName, {
		baudRate: 9600,
		open: false,
		//parser: serialport.parsers.readline("\n")
		//parser: serialport.parsers.raw
		parser: serialport.parsers.readline("\r\n")

	});


	app.get('/', function (request, response) {
  		response.sendfile(__dirname + '/index.html');
	});

	io.sockets.on('connection', function(socket){

		arduino.on('data', function(data){
			socket.emit("SerialEvent", data);
			//console.log(data);

		});

		//if the client presses refill button, send R back
		socket.on('data', function(refilly) {
			arduino.write(refilly);
			console.log('client pressed refill button');

		});

		socket.on('data', function(autoilly) {
			arduino.write(autoilly);
			console.log('client turned auto mode on/off');

		});

	});

