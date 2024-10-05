import axiosInstance from "../http/http";
import { AxiosResponse } from "axios";
import { Category } from "../types/index";

interface GetCategoriesResponse {
  data: {
    categories: Category[];
  };
}
async function healthCheck(): Promise<boolean | null> {
  try {
    const response: AxiosResponse<GetCategoriesResponse> =
      await axiosInstance.post("", {
        query: `
          query {
            categories {
              id
              name
            }
          }
        `,
      });

    return response ? true : null;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export default healthCheck;
