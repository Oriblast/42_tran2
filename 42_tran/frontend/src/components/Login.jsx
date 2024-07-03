import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REDIRECT_URI = 'http://localhost:3000';  // URL de redirection après authentification

const Login = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code && clientId && clientSecret) {
        try {
          const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: REDIRECT_URI,
          });

          const accessToken = tokenResponse.data.access_token;
          localStorage.setItem('access_token', accessToken);

          // Récupérer les informations du profil
          const profileResponse = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setProfile(profileResponse.data);
        } catch (error) {
          console.error('Erreur de récupération du token d\'accès ou du profil :', error);
        }
      }
    };

    handleCallback();
  }, [navigate, clientId, clientSecret]);

  const handleLogin = () => {
    const url = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    setAuthUrl(url);
  };

  return (
    <div>
      <h2>Connectez-vous avec 42</h2>
      <div>
        <label>
          Client ID:
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Client Secret:
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleLogin}>Generate Auth URL</button>
      {authUrl && <a href={authUrl}>Login with 42</a>}
      {profile && (
        <div>
          <h2>Profile</h2>
          <p>Name: {profile.displayname}</p>
          <p>Email: {profile.email}</p>
          {/* Affichez d'autres informations du profil ici */}
        </div>
      )}
    </div>
  );
};

export default Login;
