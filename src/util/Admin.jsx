import axios from 'axios';

const AuthHeader = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  // 'refreshToken': localStorage.getItem('refresh_token')
};

export default axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1/admin/",
  headers: AuthHeader
});
