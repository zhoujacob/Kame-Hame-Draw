import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';

import './style.css';

interface BoardProps {
    username: string;
    room: string;
    socket: Socket;
}

const Board: React.FC<BoardProps> = ({ username, room, socket }) => {
    const [roomUsers, setRoomUsers] = useState<any[]>([]);
    // const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout>();

    // SO DEPLOYMENT DOESN'T CRASH
    console.log(username);
    console.log(room);

    // Adds the new user to the array of room Users
    useEffect(() => {
        const handleDrawingRoomUsers = (data: any[]) => {
            console.log(data);
            console.log(roomUsers);
            setRoomUsers(data);
        };

        socket.on('drawingroom_users', handleDrawingRoomUsers);

        return () => {
            socket.off('drawingroom_users', handleDrawingRoomUsers);
        };
    }, [socket]);

    // Shows canvas data
    useEffect(() => {
        const handleCanvasData = (data: string) => {
            const image = new Image();
            const canvas = document.querySelector<HTMLCanvasElement>('#board')!;
            const context = canvas.getContext('2d')!;
            image.onload = function(){
                context.drawImage(image, 0, 0);
            };
            image.src = data;
        }

        socket.on('canvas-data', handleCanvasData);

        return () => {
            socket.off('canvas-data', handleCanvasData);
        };
    })

    useEffect(() => {
        drawOnCanvas();
    }, []);

    // const leaveRoom = () => {
    //     const __createdtime__ = Date.now();
    //     socket.emit('leave_room', { username, room, __createdtime__ });
    //     navigate('/', { replace: true });
    // };

    const drawOnCanvas = () => {
        const canvas = document.querySelector<HTMLCanvasElement>("#board")!;
        const context = canvas.getContext("2d")!;

        const sketch = document.querySelector<HTMLDivElement>('#sketch')!;
        const sketch_style = getComputedStyle(sketch);

        // Resizing
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        // Variables
        let mouse = {x: 0, y: 0};
        let last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', (e) => {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - (canvas.offsetLeft || 0);
            mouse.y = e.pageY - (canvas.offsetTop || 0);
        }, false);

        /* Drawing */
        context.lineWidth = 5;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = 'black';

        canvas.addEventListener('mousedown', () => {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        const onPaint = () => {
            context.beginPath();
            context.moveTo(last_mouse.x, last_mouse.y);
            context.lineTo(mouse.x, mouse.y);
            context.closePath();
            context.stroke();

            if (timeoutRef.current !== undefined){
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                const base64ImageData = canvas.toDataURL("image/png");
                socket.emit("canvas-data", base64ImageData);
            }, 1000);
        };
    };

    return (
        <div className="sketch" id="sketch">
            <canvas className="board" id="board"></canvas>
        </div>
    );
};

export default Board;
