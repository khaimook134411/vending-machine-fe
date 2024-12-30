export interface Product {
  id: string;
  title: string;
  category_id?: string;
  description?: string;
  price: number;
  quantity: number;
  image_uri?: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
