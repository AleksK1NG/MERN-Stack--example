import axios from 'axios';
/*
 * Api Service
 * */
class ApiService {
  signIn = (email, password) => {};
  signUp = (email, password) => {};
  getItems() {
    localStorage.setItem('testToken', 'test token value');
    return axios.get('http://localhost:5000/api/items');
  }

  addItem(item) {
    return axios.post('http://localhost:5000/api/items', item);
  }

  deleteItem(id) {
    return axios.delete(`http://localhost:5000/api/items/${id}`);
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
