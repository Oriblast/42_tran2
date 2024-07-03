// src/components/Profile.jsx

import React, { useEffect, useState } from 'react';
import axios from '../axios';  // Importez votre instance axios configurée

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('access_token');
      
      if (accessToken) {
        try {
          const response = await axios.get('v2/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserInfo(response.data);
        } catch (error) {
          console.error('Erreur de récupération des informations utilisateur:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Chargement des informations utilisateur...</div>;
  }

  return (
    <div>
      <h2>Profil utilisateur</h2>
      <p>Nom: {userInfo.displayname}</p>
      <p>Email: {userInfo.email}</p>
      {/* Ajoutez d'autres informations utilisateur si nécessaire */}
    </div>
  );
};

export default Profile;
