import axios from 'axios';
/*
 * Api Service
 * */
class ApiService {
  signIn = (email, password) => {};
  signUp = (email, password) => {};
  getItems() {
    return axios.get('http://localhost:5000/api/items');
  }
}

export default new ApiService();
