import axios from "axios";
import Cookies from 'js-cookie';
axios.get('http://127.0.0.1:8000/financialdata/', {withCredentials: true}).then((res) => {Cookies.set('csrftoken', res.data.csrfToken)});

class FinancialDataService {
  create(data) {
    var csrfToken = Cookies.get('csrftoken');
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken': csrfToken
      },
      withCredentials: true
    });
    return instance.post("/financialdata/", data);
  }
}

export default new FinancialDataService();