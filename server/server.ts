import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const APP = express();
const SERVER = http.createServer(APP);
// DEPLOY
const port = process.env.PORT;

// TEST
// const PORT = 4000;

const ANNOUNCER = 'Announcer';
const IO = new Server(SERVER, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


let drawingRoom = '';
let drawingRoomUsers: any[] = [];
let allUsers: any[] = [];
// Enable CORS for all routes
APP.use(cors());

/*   When the user connects from the frontend to the backend   */

IO.on('connection', (socket) => {
    console.log(`User Online ${socket.id}`);

    /* Socket.io Rooms are arbitrary channels that sockets can leave and join - can be used to broadcast events to a subset of clients */

    socket.on("join_room", (data) => {
        const { username, room } = data;
        socket.join(room);

        let __createdtime__ = Date.now();
        socket.to(room).emit('receive_message', {
            message: `${username} has joined!`,
            username: ANNOUNCER, 
            __createdtime__,
        });

        drawingRoom = room
        allUsers.push({ id: socket.id, username, room });

        drawingRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('drawingroom_users', drawingRoomUsers);
        socket.emit('drawingroom_users', drawingRoomUsers);

    }); 

    socket.on('canvas-data', (data: any) => {
        socket.broadcast.emit('canvas-data', data);
    });
});

SERVER.listen(PORT, () => {
    console.log("Started on : " + PORT);
});
