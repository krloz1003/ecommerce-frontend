import http from "../http-common";

class UserService {
  getAll() {
    return http.get("/api/users");
  }

  get(id) {
    return http.get(`/api/user/${id}`);
  }

  store(data) {
    return http.post("/api/user", data);
  }

  update(id, data) {
    return http.put(`/api/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/user/${id}`);
  }

}

export default new UserService();