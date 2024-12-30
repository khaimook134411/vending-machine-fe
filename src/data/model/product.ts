export interface Product {
  id: string;
  title: string;
  categoryId?: string;
  description?: string;
  price: number;
  quantity: number;
  imgUri?: string;
  deleted: boolean;
}
