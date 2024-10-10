import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";
import { I_Order } from "../../types";

interface GetProductsResponse {
  data: {
    getOrders: I_Order[];
  };
}

async function getOrders(): Promise<I_Order[] | null> {
  try {
    const response: AxiosResponse<GetProductsResponse> =
      await axiosInstance.post("", {
        query: `
          query {
            getOrders {
            orderId
            totalAmount
            currencyId
            status
            createdAt
            updatedAt
            __typename
                items {
                    __typename
                    productId
                    quantity
                    price
                }
            }
        }
        `,
      });

    return response.data.data.getOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}

export default getOrders;
