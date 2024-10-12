import axios from 'axios';

export const getLanguages = async () => {
  const response = await axios.get('https://backend.azakana.tech/languages/get');
  return response.data;
};

export const postLanguages = async (data, token) => {
  const response = await axios.post('https://backend.azakana.tech/languages/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteLanguage = async (languageID, token) => {
  try {
    const response = await axios.delete(`https://backend.azakana.tech/languages/delete?languageID=${languageID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};