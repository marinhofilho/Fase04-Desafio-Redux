import axios from 'axios';
// npx json-server server.json -p 3333 doesn't work
// npx json-server --host 192.168.0.14 server.json -p 3333 works

const api = axios.create({
  baseURL: 'http://192.168.0.14:3333',
});

export default api;
