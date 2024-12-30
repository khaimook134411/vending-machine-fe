import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

export class Client {
  async getCategories() {
    try {
      const response = await client.get("/categories");
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
