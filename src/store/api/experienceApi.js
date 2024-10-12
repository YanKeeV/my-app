import axios from 'axios';

export const getExperiences = async () => {
  const response = await axios.get('https://backend.azakana.tech/experiences/get');
  return response.data;
};

export const postExperiences = async (data, token) => {
  const response = await axios.post('https://backend.azakana.tech/experiences/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteExperience = async (experienceID, token) => {
  try {
    const response = await axios.delete(`https://backend.azakana.tech/experiences/delete?experienceID=${experienceID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};