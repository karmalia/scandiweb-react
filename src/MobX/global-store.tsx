import { observable, action, makeObservable } from "mobx";
import { Product, ProductToAdd } from "../types";
import getProductById from "../graphql/get-product-byid";
import { Bounce, toast } from "react-toastify";

interface BasketProduct extends Product {
  quantity: number;
  unique: string;
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
        const attributesConcat = response.data.productById.attributes
          .map(
            (attr) =>
              `${response.data.productById.id}-${attr.name}-${attr.items[0].id}`
          )
          .join("-");
        const hasSameAttribute = this.cart.products.find(
          (item) => item.unique === attributesConcat
        );

        if (hasSameAttribute) {
          existingProduct.quantity += 1;
          this.cart.totalItems += 1;
        } else {
          this.cart.products.push({
            ...response.data.productById,
            quantity: 1,
            unique: attributesConcat || "",
          });
        }
      } else {
        existingProduct.quantity += 1;
        this.cart.totalItems += 1;
      }
    } else {
      this.cart.products.push({
        ...response.data.productById,
        attributes: response.data.productById.attributes.map((attr) => ({
          ...attr,
          items: attr.items.map((item, index) => ({
            ...item,
            isActive: index === 0,
          })),
        })),
        quantity: 1,
        unique: hasAttribute
          ? response.data.productById.attributes
              .map(
                (attr) =>
                  `${response.data.productById.id}-${attr.name}-${attr.items[0].id}`
              )
              .join("-")
          : "",
      });
      this.cart.totalItems += 1;
    }
  };

  addToCart = (productToAdd: Product, selectedAttributes: string) => {
    // If addToCart works on product listing page. then get the item from the server

    const existingProduct = this.cart.products.find(
      (item) => item.id === productToAdd.id
    );
    this.cart.totalItems += 1;

    if (existingProduct) {
      const findSameAttribute = this.cart.products.find(
        (item) => item.unique === selectedAttributes
      );

      if (findSameAttribute) {
        findSameAttribute.quantity += 1;
      } else {
        this.cart.products.push({
          ...productToAdd,
          quantity: 1,
          unique: selectedAttributes,
        });
      }
    } else {
      this.cart.products.push({
        ...productToAdd,
        quantity: 1,
        unique: selectedAttributes,
      });
    }
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
