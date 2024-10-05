import React, { Component } from "react";
import { Product, ProductToAdd } from "../types";
import { RouteComponentProps, withRouter } from "react-router-dom";
import getProductById from "../graphql/get-product-byid";
import Spinner from "../components/shared/Spinner";
import Icons from "../components/Icons";
import AttributeItem from "../components/AttributeItem/AttributeItem";

type State = {
  product: Product | null;
  isLoading: boolean;
  currentImage: number;
  productToAdd: ProductToAdd | null;
};
type Props = RouteComponentProps<{ category: string; productId: string }>;
class ProductDetails extends Component<Props, State> {
  state: State = {
    product: null,
    isLoading: true,
    currentImage: 0,
    productToAdd: null,
  };

  componentDidMount(): void {
    const { productId } = this.props.match.params;

    getProductById(productId)
      .then((product) => {
        if (!product) {
          return this.setState({ isLoading: false, product: null });
        } else {
          this.setState({
            product,
            isLoading: false,
            productToAdd: {
              productId: product.id,
              attributeId: product.attributes[0].id,
              attributeItemId: product.attributes[0].items[0].id,
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, product: null });
      });
  }

  handleArrows = (direction: string) => {
    if (!this.state.product) return;
    if (direction === "left") {
      if (this.state.currentImage === 0) {
        this.setState({ currentImage: this.state.product.gallery.length - 1 });
      } else {
        this.setState({ currentImage: this.state.currentImage - 1 });
      }
    } else {
      if (this.state.currentImage === this.state.product.gallery.length - 1) {
        this.setState({ currentImage: 0 });
      } else {
        this.setState({ currentImage: this.state.currentImage + 1 });
      }
    }
  };

  render() {
    const { productId } = this.props.match.params;
    const { product, isLoading } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    if (product) {
      return (
        <div className="mt-12 flex justify-between gap-12">
          <div className="flex h-[calc(6rem_*_5)] flex-1 gap-4">
            <div className="flex flex-col overflow-y-auto gap-6">
              {product.gallery.map((imgUrl, index) => (
                <div
                  className="w-24 h-24 cursor-pointer"
                  onClick={() => this.setState({ currentImage: index })}
                >
                  <img
                    className="h-full w-full object-contain select-none"
                    src={imgUrl}
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 relative ">
              <img
                className="w-full h-full object-contain select-none"
                src={product.gallery[this.state.currentImage]}
              />
              <Icons.LeftChevron
                className="absolute top-1/2 left-4 w-10 h-10 cursor-pointer"
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.handleArrows("left");
                }}
              />
              <Icons.RightChevron
                className="absolute top-1/2 right-4 w-10 h-10 cursor-pointer"
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.handleArrows("right");
                }}
              />
            </div>
          </div>
          <div className="w-2/5 space-y-6 ">
            <h1 className="text-3xl font-raleway font-[600]">
              {product?.name}
            </h1>
            <div className="">
              {product?.attributes.map((attribute) => (
                <div key={attribute.id}>
                  <label className="text-xl font-roboto uppercase">
                    {attribute.name}
                  </label>

                  <div className="flex gap-2">
                    {attribute.items.map((item) => (
                      <AttributeItem
                        key={item.id}
                        item={item}
                        attributeType={attribute.type}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p>{product?.description}</p>
            <p>{product?.prices[0].amount}</p>
            <button>Add to cart</button>
          </div>
        </div>
      );
    }

    return <div>Something went wrong!</div>;
  }
}

export default withRouter(ProductDetails);
