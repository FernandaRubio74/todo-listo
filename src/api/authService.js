//para extraer los datos de user desde el backend y la lógica que ya se usa 
import api from './axiosConfig';

export const authService = {

  //para el login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  //encontrar usuario y sus credenciales
  getUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.sub, email: payload.email, name: payload.name };
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  //para registrar
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};