import axios from 'axios';

export default {
  login(username, password) {
    return axios.post('/auth', { username, password });
  },
  createUser(username, password) {
    return axios.post('/auth/create', { username, password });
  },
  changePassword(username, oldPassword, newPassword) {
    return axios.post('/auth/change-password', { username, oldPassword, newPassword });
  },
  deleteUser(username) {
    return axios.delete(`/auth/delete/${username}`);
  },
};
