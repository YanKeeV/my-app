import axios from 'axios';

export const getSkills = async () => {
  const response = await axios.get('//localhost:5000/skills/get');
  return response.data;
};

export const postSkills = async (data, token) => {
  const response = await axios.post('//localhost:5000/skills/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteSkill = async (skillID, token) => {
  try {
    const response = await axios.delete(`//localhost:5000/skills/delete?skillID=${skillID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};