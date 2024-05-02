import React, { useState, useEffect } from 'react';
import Board from '../board/Board'
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
    

    const leaveRoom = () => {
        console.log("Leave Room");
        const __createdtime__ = Date.now();
        socket.emit("leave_room", { username, room, __createdtime__ });
        navigate('/', { replace: true });
    };

    return (
        <div className="container">
            {showPopUp && popUpMessage && (
                <div className="popup">
                    {popUpMessage.message}
                </div>
            )}
            <div className="top-bar">
                <div className="color-picker-container">
                    <input type="color" />
                </div>
                
                <button className='btn btn-leave' onClick={leaveRoom}>
                    Leave 
                </button>
            </div>
            
            <div className="board-container">
                <Board username={username} room={room} socket={socket} />
            </div>
        </div>
    );
}

export default Container; 