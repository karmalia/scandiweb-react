import { observable, action, makeObservable } from "mobx";
import { I_Order, Product, ProductToAdd } from "../types";
import getProductById from "../graphql/queries/get-product-byid";
import { Bounce, toast } from "react-toastify";

import { makePersistable } from "mobx-persist-store";
import getUniqueId from "../utils/get-unique-id";
import getOrders from "../graphql/queries/get-orders";

export interface Basket {
  totalAmount: number;
  totalItems: number;
  currencyId: string;
  products: BasketProduct[];
}

interface BasketProduct extends Product {
  quantity: number;
  unique: string;
  totalPrice: number;
}

class GlobalStore {
  orders: I_Order[] = [];
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
      orders: observable,
      cart: observable,
      error: observable,
      toggleCartModal: action,
    });

    makePersistable(this, {
      name: "GlobalStore",
      properties: ["cart", "cartModal"],
      storage: window.localStorage,
    });
  }

  toggleCartModal = () => {
    this.cartModal = !this.cartModal;
  };

  fetchOrders = async () => {
    const response = await getOrders();
    if (!response) return toast.error("Error fetching orders");

    this.orders = response;
  };

  // Add to cart in product listing page, uses default attributes
  quickShop = async (productId: string) => {
    const response = await getProductById(productId);
    if (!response) return toast.error("Error fetching product details");
    if (response.errors) {
      toast.error(response.errors[0].message);
      return;
    }
    const hasAttribute =
      Array.isArray(response.data.productById.attributes) &&
      response.data.productById.attributes.length > 0;

    const existingProduct = this.cart.products.find(
      (item) => item.id === productId
    );

    if (existingProduct) {
      if (hasAttribute) {
        //Default Atrributes - Quick Shop
        const attributesConcat = getUniqueId(response.data.productById, true);
        const hasSameAttribute = this.cart.products.find(
          (item) => item.unique === attributesConcat
        );

        if (hasSameAttribute) {
          existingProduct.quantity += 1;
          existingProduct.totalPrice +=
            response.data.productById.prices[0].amount;
          this.cart.totalItems += 1;
        } else {
          this.cart.products.push({
            ...response.data.productById,
            quantity: 1,
            unique: attributesConcat || "",
            totalPrice: response.data.productById.prices[0].amount,
          });
        }
      } else {
        existingProduct.totalPrice +=
          response.data.productById.prices[0].amount;
        existingProduct.quantity += 1;
        this.cart.totalItems += 1;
      }
    } else {
      this.cart.products.push({
        ...response.data.productById,
        totalPrice: response.data.productById.prices[0].amount,
        attributes: response.data.productById.attributes.map((attr) => ({
          ...attr,
          items: attr.items.map((item, index) => ({
            ...item,
            isSelected: index === 0,
          })),
        })),
        quantity: 1,
        unique: hasAttribute
          ? getUniqueId(response.data.productById, true)
          : "",
      });
      this.cart.totalItems += 1;
    }
    toast.success("Product added to cart", {
      transition: Bounce,
      position: "top-center",
      style: { backgroundColor: "#4CAF50", color: "white" },
    });
    this.cart.totalAmount += response.data.productById.prices[0].amount;
  };

  addToCart = (productToAdd: Product, selectedAttributes: string) => {
    // If addToCart works on product listing page. then get the item from the server

    const existingProduct = this.cart.products.find(
      (item) => item.id === productToAdd.id
    );
    this.cart.totalItems += 1;
    this.cart.totalAmount += productToAdd.prices[0].amount;

    if (existingProduct) {
      const findSameAttribute = this.cart.products.find(
        (item) => item.unique === selectedAttributes
      );

      if (findSameAttribute) {
        findSameAttribute.quantity += 1;
        findSameAttribute.totalPrice += productToAdd.prices[0].amount;
      } else {
        this.cart.products.push({
          ...productToAdd,
          quantity: 1,
          totalPrice: productToAdd.prices[0].amount,
          unique: selectedAttributes,
        });
      }
    } else {
      this.cart.products.push({
        ...productToAdd,
        quantity: 1,
        unique: selectedAttributes,
        totalPrice: productToAdd.prices[0].amount,
      });
    }
  };

  increaseQuantity = (uniqueId: string) => {
    const existingProduct = this.cart.products.find(
      (item) => item.unique === uniqueId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice += existingProduct.prices[0].amount;
    }
    this.cart.totalItems += 1;
    this.cart.totalAmount += existingProduct?.prices[0].amount || 0;
  };

  decreaseQuantity = (uniqueId: string) => {
    const existingProduct = this.cart.products.find(
      (item) => item.unique === uniqueId
    );
    if (existingProduct) {
      existingProduct.quantity -= 1;
      existingProduct.totalPrice -= existingProduct.prices[0].amount;
      if (existingProduct.quantity === 0) {
        this.cart.products = this.cart.products.filter(
          (item) => item.unique !== uniqueId
        );
      }
    }
    this.cart.totalItems -= 1;
    this.cart.totalAmount -= existingProduct?.prices[0].amount || 0;
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

  resetCart = () => {
    this.cart.products = [];
    this.cart.totalAmount = 0;
    this.cart.totalItems = 0;
  };
}

export const globalStore = new GlobalStore();
