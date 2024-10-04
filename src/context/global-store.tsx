import { observable, action, makeObservable } from "mobx";
import { Product } from "../types";
import getProductById from "../graphql/get-product-byid";

interface BasketProduct extends Product {
  quantity: number;
}

interface Basket {
  totalAmount: number;
  totalItems: number;
  currencyId: string;
  products: BasketProduct[];
}

class GlobalStore {
  cartModal: boolean = false;
  error: Error | null = null;
  cart: Basket = {
    totalAmount: 0,
    currencyId: "USD",
    totalItems: 0,
    products: [],
  };

  constructor() {
    makeObservable(this, {
      cartModal: observable,
      cart: observable,
      error: observable,
      toggleCartModal: action,
    });
  }

  toggleCartModal = () => {
    this.cartModal = !this.cartModal;
  };

  addToCart = (product: Product) => {
    const existingProduct = this.cart.products.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      getProductById(product.id).then((product) => {
        if (product) this.cart.products.push({ ...product, quantity: 1 });
      });
    }
    this.cart.totalItems += 1;
  };

  removeFromCart = (productId: string) => {
    const existingProduct = this.cart.products.find(
      (item) => item.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity === 0) {
        this.cart.products = this.cart.products.filter(
          (item) => item.id !== productId
        );
      }
    }
    this.cart.totalItems -= 1;
  };
}

export const globalStore = new GlobalStore();
