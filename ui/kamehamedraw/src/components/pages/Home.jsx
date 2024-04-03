import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './style.css';

function Home() {
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState(""); // State to store input room code

  const createRoom = () =>{
    const roomCode = Math.random().toString(36).substring(7); // Generate random room code
    console.log(roomCode);
    navigate(`/container/${roomCode}`);
  }

  const joinRoom = () =>{
    console.log('Join Room is Clicked');
    navigate(`/container/${inputCode}`); // Navigate to container page with input room code
  }

  const handleInputChange = (event) => {
    setInputCode(event.target.value); // Update inputCode state with user input
  }

  return (
    <div className="home">
      <h1 className="header">KameHameDraw!!!</h1>
      <p>This is the homepage of our application.</p>
      <div className="button-container">
        <button onClick={createRoom} className="createButton">Create Room</button>
        <div>
          <input 
            type="text" 
            placeholder="Enter room code" 
            value={inputCode} 
            onChange={handleInputChange} 
            className="roomCodeInput"
          />
          <button onClick={joinRoom} className="joinButton">Join Room</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
