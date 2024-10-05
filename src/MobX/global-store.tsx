import { observable, action, makeObservable } from "mobx";
import { Product, ProductToAdd } from "../types";
import getProductById from "../graphql/get-product-byid";

interface BasketProduct extends Product {
  quantity: number;
  attributeIds: string;
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

  addToCart = (productToAdd: ProductToAdd) => {
    // If addToCart works on product listing page. then get the item from the server
    const newProduct = {
      productId: productToAdd.productId,
      attributeId: productToAdd.attributeId,
      attributeItemId: productToAdd.attributeItemId,
    };
    if (
      newProduct.attributeId === null ||
      newProduct.attributeItemId === null
    ) {
      getProductById(productToAdd.productId).then((product) => {
        if (!product) {
          return null;
        }
        if (product) {
          console.log(product, "Testssss");
          newProduct.attributeId = product.attributes[0].id;
          newProduct.attributeItemId = product.attributes[0].items[0].id;
        }
      });
    }
    const existingProduct = this.cart.products.find(
      (item) =>
        item.attributeIds ===
        `${newProduct.attributeId}-${newProduct.attributeItemId}`
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      getProductById(productToAdd.productId).then((product) => {
        if (product)
          this.cart.products.push({
            ...product,
            quantity: 1,
            attributeIds: `${product.attributes[0].id}-${product.attributes[0].items[0].id}`,
          });
      });
    }
    this.cart.totalItems += 1;
  };

  increaseQuantity = (productId: string) => {
    const existingProduct = this.cart.products.find(
      (item) => item.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
    this.cart.totalItems += 1;
  };

  decreaseQuantity = (productId: string) => {
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
