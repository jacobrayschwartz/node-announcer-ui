import axios from 'axios';
import store from '@/store';

export default {
  getAll() {
    return axios.get('/auth/users',
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
};
