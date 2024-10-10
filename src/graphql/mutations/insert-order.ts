import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";
import { Product } from "../../types/index";
import { Basket } from "../../MobX/global-store";
import { toast } from "react-toastify";

interface GetProductsResponse {
  data: {
    products: Product[];
  };
}

function createInsertOrder(basket: Basket): string {
  const products = basket.products.map((product) => {
    const selectedAttributes = product.attributes.map((attribute) => {
      const selectedItem = attribute.items.find((item) => item.isSelected);
      return {
        attributeId: attribute.id,
        attributeItemId: selectedItem?.id || "",
        attributeName: attribute.name,
        attributeValue: selectedItem?.value || "",
      };
    });

    return {
      productId: product.id,
      quantity: product.quantity,
      selectedAttributes,
    };
  });

  return `
  mutation {
    createOrder(
      totalAmount: ${basket.totalAmount},
      currencyId: "${basket.currencyId}",
      products: ${JSON.stringify(products).replace(/"([^"]+)":/g, "$1:")}
    ) {
      orderId
      status
      error
    }
  }
  `;
}

async function insertOrder(basket: Basket): Promise<boolean> {
  try {
    const createdOrder = createInsertOrder(basket);
    console.log("createdOrder", createdOrder);

    await axiosInstance.post("", {
      query: createdOrder,
    });
    toast.success("Order created successfully");
    return Promise.resolve(true);
  } catch (error) {
    console.error("Error inserting order:", error);
    toast.error("Error placing order!");
    return Promise.reject(false);
  }
}

export default insertOrder;
