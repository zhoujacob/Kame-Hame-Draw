import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './style.css';

interface HomeProps {
  username: string;
  setUsername: React.Dispatch<string>;
  room: string;
  setRoom: React.Dispatch<string>;
  socket: Socket;
}

const Home: React.FC<HomeProps> = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
      navigate('/container'); 
    }
  }

  return (
    <div className="home">
      <div className="homeContainer">
        <h1>KameHameDraw!!!</h1>
        <input
          className="input-container"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="input-container"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value='Goku'>Goku</option>
          <option value='Vegeta'>Vegeta</option>
          <option value='Zeno'>Zeno</option>
          <option value='Beerus'>Beerus</option>
          <option value='Whis'>Whis</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom}
        > Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
