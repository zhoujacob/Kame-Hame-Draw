import React from "react";
import Board from '../board/Board';
import { useParams } from 'react-router-dom';

import './style.css'

function Container(){
    const { roomCode } = useParams<{ roomCode : string}>();

    return (
        <div className="container">
            <div className="color-picker-container">
                <input type="color" />
            </div>

            <div className="board-container">
                <Board />
            </div>
        </div>
    );
}

export default Container; 

