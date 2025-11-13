//? libreria Axios
import axios from 'axios';

//? Direccion base del backend
const API_BASE_URL = 'http://localhost:5000/api';


//? Instacia de Axios

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
});

//? Interceptor Token

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Redirigir al login
        }
        return Promise.reject(error);
    }
);

//? Funciones de autenticación 

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

//? Funciones para otros endpoints (EJEMPLO)
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData),
};


export default api;