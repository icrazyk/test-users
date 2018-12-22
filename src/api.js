import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600',
});

api.interceptors.response.use(response => response.data);

export default {
  ...axios,
  ...api,
};
