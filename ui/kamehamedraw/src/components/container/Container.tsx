import React from 'react';
import Board from '../board/Board'
import { Socket } from 'socket.io-client';

import './style.css'

interface ContainerProps {
    username: string;
    room: string;
    socket: Socket;
}

const Container: React.FC<ContainerProps> = ({ username, room, socket }) => {
    return (
        <div className="container">
            <div className="color-picker-container">
                <input type="color" />
            </div>

            <div className="board-container">
                <Board username={username} room={room} socket={socket} />
            </div>
        </div>
    );
}

export default Container; 