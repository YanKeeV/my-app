import axios from 'axios';

export const getExperiences = async () => {
  const response = await axios.get('//localhost:5000/experiences/get');
  return response.data;
};

export const postExperiences = async (data, token) => {
  const response = await axios.post('//localhost:5000/experiences/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteExperience = async (experienceID, token) => {
  try {
    const response = await axios.delete(`//localhost:5000/experiences/delete?experienceID=${experienceID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};