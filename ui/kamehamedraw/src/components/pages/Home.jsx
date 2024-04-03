import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './style.css';

function Home() {
  const navigate = useNavigate();

  const createRoom = () =>{
    console.log('Create Room is Clicked');
    navigate('/container'); 
  }

  const joinRoom = () =>{
    console.log('Join Room is Clicked');
    navigate('/container'); 
  }

  return (
    <div className="home">
      <h1 className="header">KameHameDraw!!!</h1>
      <p>This is the homepage of our application.</p>
      <div className="button-container">
        <button onClick={createRoom} className="createButton">Create Room</button>
        <button onClick={joinRoom} className="joinButton">Join Room</button>
      </div>
    </div>
  );
}


export default Home;
