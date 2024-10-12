import React, { Component } from "react";
import { Product, ProductToAdd } from "../types";
import { RouteComponentProps, withRouter } from "react-router-dom";
import getProductById from "../graphql/queries/get-product-byid";
import Spinner from "../components/shared/Spinner";
import Icons from "../components/shared/Icons";
import AttributeItem from "../components/AttributeItem/AttributeItem";
import { observer } from "mobx-react";
import { globalStore } from "../MobX/global-store";
import getUniqueId from "../utils/get-unique-id";
import parse from "html-react-parser";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import convertToSlug from "../utils/convertToSlug";
import checkIfAllAttributesSelected from "../utils/checkIfAllAttributesSelected";
type State = {
  product: Product | null;
  isLoading: boolean;
  currentImage: number;
  productToAdd: ProductToAdd | null;
};
type Props = RouteComponentProps<{ category: string; productId: string }>;

@observer
class ProductDetails extends Component<Props, State> {
  state: State = {
    product: null,
    isLoading: true,
    currentImage: 0,
    productToAdd: null,
  };

  componentDidMount(): void {
    const { productId } = this.props.match.params;
    window.scrollTo({ top: 0, behavior: "smooth" });

    getProductById(productId)
      .then((response) => {
        const product = response?.data.productById;
        if (!product) {
          return this.setState({ isLoading: false, product: null });
        } else {
          this.setState({
            product: {
              ...product,
              attributes: product.attributes.map((attribute) => ({
                ...attribute,
                items: attribute.items.map((item, index) => ({
                  ...item,
                  isSelected: false,
                })),
              })),
            },
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, product: null });
      });
  }

  handleAttributeSelection = (attributeId: string, itemId: string) => {
    if (!this.state.product) return;
    const updatedProduct = { ...this.state.product };
    updatedProduct.attributes = updatedProduct.attributes.map((attribute) => {
      if (attribute.id === attributeId) {
        attribute.items = attribute.items.map((item) => {
          if (item.id === itemId) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
          return item;
        });
      }
      return attribute;
    });
    this.setState({ product: updatedProduct });
  };

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
    const { product, isLoading } = this.state;
    const { addToCart } = globalStore;
    if (isLoading) {
      return <Spinner />;
    }

    if (product) {
      return (
        <div className="mt-12 px-4 flex lg:flex-row flex-col lg:flex-nowrap flex-wrapjustify-between gap-12">
          <div className="flex h-auto lg:h-[calc(6rem_*_5)] w-full lg:flex-1 gap-4 lg:flex-row flex-col-reverse">
            <div
              className="flex flex-col overflow-y-auto gap-6 h-auto"
              data-testid="product-gallery"
            >
              {product &&
                product.gallery.map((imgUrl, index) => (
                  <div
                    key={index + imgUrl}
                    className={twMerge(
                      "w-24 h-24 cursor-pointer duration-300 ease-linear",
                      this.state.currentImage === index &&
                        "border border-scandiGreen"
                    )}
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
                key={product.gallery[this.state.currentImage]}
                className="w-full h-full object-contain select-none animate-fade animate-once animate-ease-out"
                src={product.gallery[this.state.currentImage]}
              />
              {product && product.gallery.length > 1 && (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="lg:w-2/5 w-full space-y-6">
            <h1 className="text-3xl font-raleway font-[600]">
              {product?.name}
            </h1>
            <div className="flex flex-col gap-4">
              {product?.attributes.map((attribute) => (
                <div
                  key={attribute.id}
                  className="space-y-2"
                  data-testid={`product-attribute-${convertToSlug(
                    attribute.name
                  )}`}
                >
                  <label className="text-xl font-semibold font-roboto tracking-wide uppercase">
                    {attribute.name}:
                  </label>

                  <div className="flex gap-2">
                    {attribute.items.map((item) => (
                      <AttributeItem
                        key={item.id}
                        attributeId={attribute.id}
                        item={item}
                        attributeType={attribute.type}
                        isSelected={item.isSelected || false}
                        handleAttributeSelection={this.handleAttributeSelection}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-xl font-semibold font-roboto tracking-wide uppercase">
                PRICE:
              </label>
              <p className="font-raleway font-semibold text-2xl">
                {product?.prices[0].currency.symbol}
                {product?.prices[0].amount}
              </p>
            </div>
            <button
              onClick={() => {
                if (checkIfAllAttributesSelected(product.attributes)) {
                  addToCart(product, getUniqueId(product));
                  toast.success("Product added to cart", {
                    position: "top-center",
                  });
                } else {
                  toast.error("Please select all attributes");
                }
              }}
              disabled={!product.in_stock}
              data-testid="add-to-cart"
              className={twMerge(
                "px-16 py-4 bg-scandiGreen text-white font-raleway font-semibold",
                !product.in_stock && "bg-gray-300 cursor-not-allowed"
              )}
            >
              ADD TO CART
            </button>
            <p data-testid="product-description">
              {parse(product?.description)}
            </p>
          </div>
        </div>
      );
    }

    return <div>Something went wrong!</div>;
  }
}

export default withRouter(ProductDetails);
