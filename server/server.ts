import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Enable CORS for all routes
app.use(cors());

io.on('connection', (socket) => {
    console.log('User Online');

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on('canvas-data', (data: any) => {
        socket.broadcast.emit('canvas-data', data);
    });
});

const server_port = 4000;
server.listen(server_port, () => {
    console.log("Started on : " + server_port);
});
