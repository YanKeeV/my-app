import axios from 'axios';

export const getSkills = async () => {
  const response = await axios.get('https://backend.azakana.tech/skills/get');
  return response.data;
};

export const postSkills = async (data, token) => {
  const response = await axios.post('https://backend.azakana.tech/skills/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteSkill = async (skillID, token) => {
  try {
    const response = await axios.delete(`https://backend.azakana.tech/skills/delete?skillID=${skillID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};