import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";

interface confirmOrderResponse {
  data: {
    updateOrder: string;
  };
}
async function confirmOrder(orderId: string): Promise<string | null> {
  try {
    const response: AxiosResponse<confirmOrderResponse> =
      await axiosInstance.post("", {
        query: `
          mutation {
            updateOrder(
              orderId: ${orderId},
              status: "confirmed",
              ) 
          }
        `,
      });

    return response.data.data.updateOrder; // Call the setter function with categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export default confirmOrder;
