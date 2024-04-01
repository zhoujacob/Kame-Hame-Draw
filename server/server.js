var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

var cors = require('cors');
// Enable CORS for all routes
app.use(cors());

io.on('connection', (socket) => {
    console.log('User Online');

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    });
});

var server_port = 4000;
http.listen(server_port, () => {
    console.log("Started on : " + server_port);
});
