import React, { useState, useEffect } from 'react';
import Board from '../board/Board'
import { Socket } from 'socket.io-client';

import './style.css'

interface ContainerProps {
    username: string;
    room: string;
    socket: Socket;
}

interface PopupMessage {
    message: string;
    username: string;
    __createdtime__: number;
}


const Container: React.FC<ContainerProps> = ({ username, room, socket }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState<PopupMessage | null>(null);

    // Displays message when a new user joins
    useEffect(() => {
        const handleMessageReceived = (message : PopupMessage) => {
            console.log(message);
            setPopUpMessage(message);
            setShowPopUp(true);

            setTimeout(() => {
                setShowPopUp(false);
            }, 3000);
        };
    
        socket.on('receive_message', handleMessageReceived);
    
        return () => {
            socket.off('receive_message', handleMessageReceived);
        };
    }, [socket]);

    return (
        <div className="container">
            {showPopUp && popUpMessage && (
                <div className="popup">
                    {popUpMessage.message}
                </div>
            )}
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