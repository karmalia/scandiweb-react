import axiosInstance from "../http/http";
import { AxiosResponse } from "axios";
import { Category } from "../types/index";

interface GetCategoriesResponse {
  data: {
    categories: Category[];
  };
}
async function getCategories(): Promise<Category[] | null> {
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

    return response.data.data.categories; // Call the setter function with categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export default getCategories;
