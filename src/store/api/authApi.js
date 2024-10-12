import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('https://backend.azakana.tech/auth/login', credentials);
  return response.data;
};