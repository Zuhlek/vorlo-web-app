import axios from 'axios'; 

const API_URL = 'https://vorlo-api-app.onrender.com/api/v1/auth'; 

const register = (firstname, lastname, email, password) => {
    return axios.post(`${API_URL}/register`, {
        firstname, 
        lastname,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/authenticate`, {
        email,
        password,
    });
};

const refreshToken = (refreshToken) => {
    return axios.post(`${API_URL}/refresh-token`, {
        refreshToken,
    });
};


export default {
    register,
    login,
    refreshToken,
};
