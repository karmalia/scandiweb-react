import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";

interface rejectOrderResponse {
  data: {
    updateOrder: string;
  };
}
async function rejectOrder(orderId: string): Promise<string | null> {
  try {
    const response: AxiosResponse<rejectOrderResponse> =
      await axiosInstance.post("", {
        query: `
          mutation {
            updateOrder(
              orderId: ${orderId},
              status: "rejected",
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

export default rejectOrder;
