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

export interface Money {
  coin_1: number;
  coin_5: number;
  coin_10: number;
  bank_20: number;
  bank_50: number;
  bank_100: number;
  bank_500: number;
  bank_1000: number;
}
