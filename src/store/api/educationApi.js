import axios from 'axios';

export const getEducations = async () => {
  const response = await axios.get('//localhost:5000/educations/get');
  return response.data;
};

export const postEducations = async (data, token) => {
  const response = await axios.post('//localhost:5000/educations/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteEducation = async (educationID, token) => {
  try {
    const response = await axios.delete(`//localhost:5000/educations/delete?educationID=${educationID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};