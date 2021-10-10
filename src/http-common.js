import axios from "axios";

export default axios.create({
  baseURL: "http://laravel-ecommerce.test/",
  headers: {
    "Content-type": "application/json"
  }
});