import http from "../http-common";

class AuthService {
  login(data) {
    return http.post("/api/auth/login", data);
  }

  /*get(slug) {
    return http.get(`/api/product/${slug}`);
  }

  store(data) {
    return http.post("/api/product", data);
  }

  update(id, data) {
    return http.put(`/api/product/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/product/${id}`);
  }*/

}

export default new AuthService();