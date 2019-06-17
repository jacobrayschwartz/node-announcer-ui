import axios from 'axios';
import store from '@/store';

export default {
  upload(file, name, tags) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tags', tags);
    formData.append('file', file);
    console.log(formData);
    console.log(file);
    return axios.post('/audio/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${store.state.token}`,
        },
        onUploadProgress: (evt) => {
          console.log(evt);
        },
      });
  },
};
