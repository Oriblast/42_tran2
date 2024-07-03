// src/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.intra.42.fr/',  // Base URL de l'API 42
  timeout: 5000,  // Délai d'attente
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
