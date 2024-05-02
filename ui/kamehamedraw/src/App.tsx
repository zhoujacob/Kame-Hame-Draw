// App.tsx
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from 'socket.io-client';
import Home from './components/pages/Home';
import Container from './components/container/Container'

// Deployment
const socket = io("https://kame-hame-draw.onrender.com"); 

// Testing
// const socket = io("http://localhost:4000");

const App: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              socket={socket}

              />
            } 
          />
        <Route 
          path= '/container' 
          element={
            <Container 
              username={username} 
              room={room} 
              socket={socket} />}

          />
      </Routes>
    </Router>
  );
};

export default App;
