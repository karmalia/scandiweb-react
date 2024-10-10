import axiosInstance from "../../http/http";
import { AxiosResponse } from "axios";
import { Product } from "../../types/index";

interface GetProductsResponse {
  data: {
    productById: Product;
  };
  errors: [{ message: string }];
}
async function getProductById(
  productId: string
): Promise<GetProductsResponse | null> {
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
                  id
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
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default getProductById;
