import axios from "axios";
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-type": "application/json",
    'X-CSRFToken': csrftoken
  },
  withCredentials: true
});