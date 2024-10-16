import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";
import { I_OrderDetails } from "../../types";

interface GetOrderById {
  data: {
    getOrderById: I_OrderDetails;
  };
}

async function getOrderById(id: string): Promise<I_OrderDetails | null> {
  try {
    const response: AxiosResponse<GetOrderById> = await axiosInstance.post("", {
      query: `
          query {
            getOrderById(id: ${id}) {
                orderId
                totalAmount
                currencyId
                status
                createdAt
                updatedAt
                __typename
                items {
                    productId
                    productName
                    quantity
                    price
                    __typename
                    attributes {
                        attributeId
                        attributeName
                        attributeValue
                    }
                }       
            }
        }           
        `,
    });

    return response.data.data.getOrderById;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}

export default getOrderById;
