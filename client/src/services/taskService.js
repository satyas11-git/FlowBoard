import api from '../utils/axios';

export const taskService = {
  createTask: async (title, description, status = 'pending') => {
    const response = await api.post('/tasks', { title, description, status });
    return response.data;
  },

  getTasks: async (status = null, search = '') => {
    const params = {};
    if (status) params.status = status;
    if (search) params.search = search;
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  updateTask: async (id, title, description, status) => {
    const response = await api.put(`/tasks/${id}`, {
      title,
      description,
      status,
    });
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
