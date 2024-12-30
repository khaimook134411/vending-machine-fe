import axios from "axios";
import { Product } from "../model/product";
import { Category } from "@/app/page";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

export class Client {
  async getCategories(): Promise<Category[] | unknown> {
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

  async getProductById(id: string): Promise<Product | unknown> {
    try {
      const response = await client.get(`/products/${id}`);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async createOrder(): Promise<any> {
    try {
      const response = await client.post("/order/create");
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
