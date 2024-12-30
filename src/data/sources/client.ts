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

  async createOrder(args: {
    product_id: string;
    quantity: number;
  }): Promise<{ id: string } | unknown> {
    try {
      const response = await client.post("/order/create", {
        product_id: args.product_id,
        quantity: args.quantity,
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
