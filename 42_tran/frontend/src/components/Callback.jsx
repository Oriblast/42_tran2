// src/components/Callback.jsx

import React, { useEffect } from 'react';
import axios from '../axios';  // Importez votre instance axios configurée
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = 'votre_client_id_42';  // Remplacez par votre client ID
const CLIENT_SECRET = 'votre_client_secret_42';  // Remplacez par votre client secret
const REDIRECT_URI = 'http://localhost:3000/callback';  // URL de redirection après authentification

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await axios.post('oauth/token', {
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          redirect_uri: REDIRECT_URI,
        });
        
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/profile');  // Rediriger vers la page de profil après authentification
      } catch (error) {
        console.error('Erreur de récupération du token d\'accès:', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchAccessToken(code);
    }
  }, [navigate]);

  return <div>Authentification en cours...</div>;
};

export default Callback;
