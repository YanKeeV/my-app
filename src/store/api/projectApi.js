import axios from 'axios';

export const getProjects = async () => {
  const response = await axios.get('//localhost:5000/projects/get');
  return response.data;
};

export const postProjects = async (data, token) => {
  const response = await axios.post('//localhost:5000/projects/post', data, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export const deleteProject = async (projectID, token) => {
  try {
    const response = await axios.delete(`//localhost:5000/projects/delete?projectID=${projectID}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};