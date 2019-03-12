import axios from 'axios';
/*
 * Api Service
 * */
class ApiService {
  signIn = (email, password) => {};
  signUp = (email, password) => {};
  getItems() {
    return axios.get('/api/items');
  }

  addItem(item) {
    return axios.post('/api/items', item, tokenConfig());
  }

  deleteItem(id) {
    return axios.delete(`/api/items/${id}`, tokenConfig());
  }

  registerUser({ name, email, password }) {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // Request body
    const body = JSON.stringify({ name, email, password });

    return axios.post('/api/users', body, config);
  }

  loginUser({ email, password }) {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // Request body
    const body = JSON.stringify({ email, password });

    return axios.post('/api/auth', body, config);
  }

  loadUser() {
    return axios.get('/api/auth/user', tokenConfig());
  }
}

export default new ApiService();

export const tokenConfig = () => {
  // Get token from localstorage
  const token = localStorage.getItem('token');

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
