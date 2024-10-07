import React, { Component } from "react";
import { globalStore } from "../../MobX/global-store";
import { observer } from "mobx-react";
import Icons from "../Icons";

type Props = {};

type State = {};
@observer
export default class CartContent extends Component<Props, State> {
  state = {};

  render() {
    const { cart, increaseQuantity, decreaseQuantity } = globalStore;
    const { products, totalAmount, currencyId, totalItems } = cart;
    return (
      <div className="bg-white w-[325px] min-w-[300px] z-10  h-auto space-y-8 top-0 right-40 translate-x-[10%] py-8 px-4">
        <h1 className="font-raleway">
          <span className="font-bold text-2xl">My Bag, </span>
          <span className="text-xl">
            {totalItems > 0 ? `${totalItems} items` : " is empty"}
          </span>
        </h1>
        <div className="flex flex-col  gap-8">
          {cart.products.length > 0 &&
            cart.products.map((product) => {
              return (
                <div key={product.id} className="flex flex-1 ">
                  <div className="w-2/3">
                    <h1 className="font-raleway text-2xl font-[300] tracking-wide">
                      {product.name}
                    </h1>
                    <p className="font-raleway font-[600]">
                      {product.prices[0].currency.symbol}
                      {product.prices[0].amount}
                    </p>
                    <div className="space-y-4">
                      {product.attributes.map((attribute) => (
                        <div
                          key={attribute.name}
                          className="flex flex-col gap-4"
                          data-testid={`cart-item-attribute-${attribute.name}`}
                        >
                          <p className="font-raleway font-[400]">
                            {attribute.name}:
                          </p>
                          <p className="flex font-raleway font-[300] gap-2">
                            {attribute.items.map((item) => {
                              switch (attribute.type) {
                                case "swatch":
                                  return (
                                    <span
                                      key={item.id}
                                      data-testid={`cart-item-attribute-${
                                        attribute.name
                                      }-${attribute.name}-${
                                        item.isSelected && "selected"
                                      }`}
                                      className="h-8 w-8  inline-block"
                                      style={{
                                        backgroundColor: item.value,
                                      }}
                                    ></span>
                                  );

                                case "text":
                                  return (
                                    <div
                                      data-testid={`cart-item-attribute-${
                                        attribute.name
                                      }-${attribute.name}-${
                                        item.isSelected && "selected"
                                      }`}
                                      className={`${
                                        item.isSelected
                                          ? " bg-black text-white"
                                          : "bg-white text-black"
                                      } border border-black min-w-[60px] text-center`}
                                      key={item.id}
                                    >
                                      {item.value}
                                    </div>
                                  );

                                default:
                                  <span>Error</span>;
                                  break;
                              }
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col w-1/3">
                    <img
                      src={product.gallery[0]}
                      alt={product.name}
                      className="flex-1 object-contain"
                    />
                    <div className="flex justify-between items-center gap-4">
                      <button
                        className="h-8 w-8 font-raleway text-2xl grid place-content-center"
                        data-testid="cart-item-amount-increase"
                        onClick={() => increaseQuantity(product.id)}
                      >
                        <Icons.Plus />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="h-8 w-8 font-raleway text-2xl grid place-content-center"
                        onClick={() => decreaseQuantity(product.id)}
                        data-testid="cart-item-amount-decrease"
                      >
                        <Icons.Minus />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
