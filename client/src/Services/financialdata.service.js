import http from "../http-common";

class FinancialDataService {
  create(data) {
    return http.post("/financialdata/", data);
  }
}

export default new FinancialDataService();