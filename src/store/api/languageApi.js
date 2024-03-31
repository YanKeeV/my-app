import axios from 'axios';

export const getLanguages = async () => {
  const response = await axios.get('//localhost:5000/languages/get');
  return response.data;
};

export const postLanguages = async (data, token) => {
  const response = await axios.post('//localhost:5000/languages/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteLanguage = async (languageID, token) => {
  try {
    const response = await axios.delete(`//localhost:5000/languages/delete?languageID=${languageID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};