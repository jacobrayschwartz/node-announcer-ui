// Contains api calls for searching audio files
import axios from 'axios';
import store from '@/store';


export default {
  search(searchString) {
    return axios.post('/audio/search', { searchString },
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
  delete(uuid) {
    return axios.delete(`/audio/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
};
