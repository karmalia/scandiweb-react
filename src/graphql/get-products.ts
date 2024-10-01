import axiosInstance from "../http/http";
import { AxiosResponse } from "axios";
import { Product } from "../types/index";

interface GetProductsResponse {
  data: {
    products: Product[];
  };
}
async function getProducts(
  setter: (products: Product[]) => void
): Promise<void> {
  try {
    const response: AxiosResponse<GetProductsResponse> =
      await axiosInstance.post("", {
        query: `
          query {
            products {
              id
              name
              description
              in_stock
              brand
              gallery
              category
              prices {
                amount
                currency {
                  label
                  symbol
                  __typename
                }
              __typename
              }
            __typename
          } 
        }
        `,
      });
    setter(response.data.data.products); // Call the setter function with categories
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export default getProducts;
