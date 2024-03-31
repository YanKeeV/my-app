import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('//localhost:5000/auth/login', credentials);
  return response.data;
};