import axios from 'axios';

export const getEducations = async () => {
  const response = await axios.get('https://backend.azakana.tech/educations/get');
  return response.data;
};

export const postEducations = async (data, token) => {
  const response = await axios.post('https://backend.azakana.tech/educations/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteEducation = async (educationID, token) => {
  try {
    const response = await axios.delete(`https://backend.azakana.tech/educations/delete?educationID=${educationID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};