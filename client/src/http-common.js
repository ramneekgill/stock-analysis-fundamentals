import axios from "axios";
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');

export default axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-type": "application/json",
    'X-CSRFToken': csrftoken
  },
  withCredentials: true
});