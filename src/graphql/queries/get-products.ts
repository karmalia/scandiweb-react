import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";
import { Product } from "../../types/index";

interface GetProductsResponse {
  data: {
    products: Product[];
  };
}
async function getProducts(
  setter: (products: Product[]) => void,
  category: string
): Promise<void> {
  try {
    console.log("Fetching products for category:", category);
    const response: AxiosResponse<GetProductsResponse> =
      await axiosInstance.post("", {
        query: `
          query {
            products (category:"${category || "all"}") {
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
