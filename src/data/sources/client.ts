import axios from "axios";
import { Product } from "../model/product";

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
  async getProducts(): Promise<Product[] | unknown> {
    try {
      const response = await client.get("/products");
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
