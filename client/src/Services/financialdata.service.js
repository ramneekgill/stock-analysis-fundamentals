import axios from "axios";
import Cookies from 'js-cookie';
axios.get('https://stock-analysis-fundamentals.herokuapp.com/financialdata/', {withCredentials: true}).then((res) => {Cookies.set('csrftoken', res.data.csrfToken)});

class FinancialDataService {
  create(data) {
    var csrfToken = Cookies.get('csrftoken');
    const instance = axios.create({
      baseURL: "https://stock-analysis-fundamentals.herokuapp.com",
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