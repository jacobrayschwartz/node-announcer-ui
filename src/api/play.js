// Contains api calls for searching audio files
import axios from 'axios';
import store from '@/store';


export default {
  play(uuid, count) {
    return axios.post('/audio/play', { uuid, count },
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
  stop() {
    return axios.post('/audio/stop', {},
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
  pause() {
    return axios.post('/audio/pause', {},
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
  resume() {
    return axios.post('/audio/resume', {},
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
  },
};
