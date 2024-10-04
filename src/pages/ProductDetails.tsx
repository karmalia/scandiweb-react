import React, { Component } from "react";
import { Product } from "../types";
import { RouteComponentProps, withRouter } from "react-router-dom";
import getProductById from "../graphql/get-product-byid";

type State = {
  product: Product | null;
  isLoading: boolean;
};
type Props = RouteComponentProps<{ category: string; productId: string }>;
class ProductDetails extends Component<Props, State> {
  state: State = {
    product: null,
    isLoading: true,
  };

  componentDidMount(): void {
    const { productId } = this.props.match.params;

    getProductById(productId)
      .then((product) => {
        this.setState({ product, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, product: null });
      });
  }

  render() {
    const { productId } = this.props.match.params;
    const { product, isLoading } = this.state;

    if (product) {
      return (
        <div>
          <div>
            <div>
              {product.gallery.map((imgUrl) => (
                <p>{imgUrl}</p>
              ))}
            </div>
          </div>
          <div>
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <p>{product?.prices[0].amount}</p>
            <button>Add to cart</button>
          </div>
        </div>
      );
    }

    return <div>...loading</div>;
  }
}

export default withRouter(ProductDetails);
