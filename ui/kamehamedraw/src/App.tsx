// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Home from './components/pages/Home';
import Container from './components/container/Container';


const App: React.FC = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/container/:roomcode" element={<Container />} />
          </Routes>
        </Router>
    );
};

export default App;
