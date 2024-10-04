//Mutation String Schema
export interface MutationCart {
  totalAmount: number;
  currencyId: string;
  products: CartItem[];
}

interface CartItem {
  productId: string;
  quantity: number;
}
