import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './pages/HomePage';
//import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Error from './pages/Error';
import Pong from './pages/Pong';
import IApong from './pages/IApong';
import Tournament from './pages/Tournament';
import PlayerForm from './pages/PlayerForm';
import Match from './pages/Match';
import Multiplayer from './pages/Multiplayer';
import PongGame from './PongGame'; 
import Home from './pages/Home';
import Header from "./pages/Header";
import Login from './components/Login';
import Callback from './components/Callback';
import Profile from './components/Profile';
import Murpong from './pages/murpong';
import Pong3D from './components/Pong3D';
export const API_URL = "http://localhost:8000/api/students/";

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

function AppRoutes() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    console.log("Classe appliquée au body :", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/IApong" element={<IApong />} />
        <Route path="/Multiplayer" element={<Multiplayer />} />
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/PongGame" element={<PongGame/>} />
        <Route path="/PlayerForm" element={<PlayerForm />} />
        <Route path="/Match" element={<Match />} />
        <Route path="Home" element={<Home/>} />
        <Route path="Header" element={<Header/>} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/murpong" element={<Murpong />} />
        <Route path="/Pong3D" element={<Pong3D />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;