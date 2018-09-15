var socket  = require('socket.io');
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = socket.listen(server);
var port    = process.env.PORT || 2224;

server.listen(port, function () {
	console.log('Server running at port : %d', port);
});

io.on('connection', function(socket) {

	socket.on('room', function(room) {
        socket.join(room);
    });

	socket.on('new_count_chat', function(data) {
		io.sockets.in(data.room)
			.emit('new_count_chat', {
				new_count_chat: data.new_count_chat
			});
	});

	socket.on('new_message', function(data) {
		io.sockets.in(data.room)
			.emit('new_message', {
				room: data.room,
				shop_product_id: data.shop_product_id,
				sender_id: data.sender_id,
				receiver_id: data.receiver_id,
				message: data.message,
				date_sent: data.date_sent,
				date_read: data.date_read
			});
	});
});
