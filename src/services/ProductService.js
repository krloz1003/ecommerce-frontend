import http from "../http-common";

class ProductService {
  getAll() {
    return http.get("/api/products");
  }

  get(slug) {
    return http.get(`/api/product/${slug}`);
  }

  /*create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new ProductService();