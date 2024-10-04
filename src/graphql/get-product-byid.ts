import axiosInstance from "../http/http";
import { AxiosResponse } from "axios";
import { Product } from "../types/index";

interface GetProductsResponse {
  data: {
    productById: Product;
  };
}
async function getProductById(productId: string): Promise<Product | null> {
  try {
    const response: AxiosResponse<GetProductsResponse> =
      await axiosInstance.post("", {
        query: `
          query {
              productById(id: "${productId}") {
                id
                name
                description
                in_stock
                brand
                prices {
                  amount
                  currency {
                    label
                    symbol
                    __typename
                  }
                  __typename
                }
                gallery
                category
                attributes {
                  name
                  type
                  items{
                    id
                    value
                    displayValue
                    __typename
                  }
                  __typename
                }
                __typename   
              }
          }
        `,
      });
    return response.data.data.productById as Product;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default getProductById;
