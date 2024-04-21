import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './style.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState<string>(""); // State to store input room code
    
    const createRoom = () =>{
      // Generate random room code
      const roomCode = Math.random().toString(36).substring(7); 
      navigate(`/container/${roomCode}`);
    }

    const joinRoom = () =>{
      // Navigate to container page with input room code
      console.log('Join Room is Clicked');
      navigate(`/container/${inputCode}`); 
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Update inputCode state with user input
      setInputCode(event.target.value); 
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
};

export default Home;
