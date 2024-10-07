import React, { Component } from "react";
import { Product } from "../types";
import Icons from "./Icons";
import { observer } from "mobx-react";
import { globalStore } from "../MobX/global-store";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
type Props = {
  product: Product;
};

type State = {};

@observer
export default class ProductCard extends Component<Props, State> {
  state = {};

  render() {
    const { quickShop } = globalStore;
    const { product } = this.props;
    return (
      <Link
        to={`/${product.category}/${product.id}`}
        className="group p-4 hover:shadow-even duration-300 hover:scale-105"
        data-testid={`product-${product.name}`}
      >
        <div className="relative w-full h-[440px]">
          <img
            className="object-cover w-full h-full"
            src={product.gallery[0]}
            alt={product.name}
          />
          {!product.in_stock && (
            <div className="absolute top-0 left-0 grid place-content-center text-3xl w-full h-full text-[#8D8F9A] bg-white/40">
              OUT OF STOCK
            </div>
          )}
          {product.in_stock && (
            <button
              onClick={(e: any) => {
                e.preventDefault();
                quickShop(product.id);
              }}
              className="absolute -bottom-8 opacity-0 group-hover:opacity-100 duration-300 h-12 w-12 grid place-content-center right-4 p-4 rounded-full bg-scandiGreen"
            >
              <Icons.Cart className={"text-white"} />
            </button>
          )}
        </div>
        <div className="font-raleway text-xl  pt-8">
          <h2>{product.name}</h2>
          <h3 className="text-[#8D8F9A]">
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </h3>
        </div>
      </Link>
    );
  }
}
