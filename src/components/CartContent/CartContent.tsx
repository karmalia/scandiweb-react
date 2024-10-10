import { Component, PureComponent } from "react";
import { globalStore } from "../../MobX/global-store";
import { observer } from "mobx-react";
import Icons from "../shared/Icons";
import AttributeItem from "../AttributeItem/AttributeItem";

import getAttributeItemTypeClassName from "../../utils/get-attribute-item-type-classname";
import getUniqueId from "../../utils/get-unique-id";
import insertOrder from "../../graphql/mutations/insert-order";

@observer
export default class CartContent extends PureComponent {
  render() {
    const {
      cart,
      increaseQuantity,
      decreaseQuantity,
      resetCart,
      toggleCartModal,
    } = globalStore;
    const { totalAmount, currencyId, totalItems } = cart;
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white w-[330px] min-w-[300px] z-10  h-auto space-y-8 py-8 px-4"
      >
        <h1 className="font-raleway">
          <span className="font-bold text-2xl">My Bag, </span>
          <span className="text-lg">
            {totalItems > 0 ? `${totalItems} items` : " is empty"}
          </span>
        </h1>
        <div className="flex flex-col  gap-8">
          {cart.products.length > 0 &&
            cart.products.map((product) => {
              return (
                <div key={product.id} className="flex flex-1 ">
                  <div className="w-2/3 space-y-2">
                    <h1 className="font-raleway text-2xl tracking-wide font-bold">
                      {product.name}
                    </h1>
                    <p className="font-raleway font-[600]">
                      {product.prices[0].currency.symbol}
                      {product.totalPrice.toFixed(2)}
                    </p>
                    <div className="space-y-2">
                      {product.attributes.map((attribute) => (
                        <div
                          key={attribute.name}
                          className="flex flex-col gap-1"
                          data-testid={`cart-item-attribute-${attribute.name}`}
                        >
                          <p className="font-raleway font-[400] text-lg">
                            {attribute.name}:
                          </p>
                          <div className="flex font-raleway  flex-wrap font-[300] gap-1">
                            {attribute.items.map((item) => {
                              return (
                                <AttributeItem
                                  item={item}
                                  attributeType={attribute.type}
                                  isSelected={item.isSelected!}
                                  attributeId={attribute.id}
                                  className={getAttributeItemTypeClassName(
                                    attribute.type
                                  )}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col w-1/3 items-center">
                    <img
                      src={product.gallery[0]}
                      alt={product.name}
                      className="flex-1 object-contain"
                    />
                    <div className="flex justify-between items-center gap-4">
                      <button
                        className="h-8 w-8 font-raleway text-2xl grid place-content-center"
                        data-testid="cart-item-amount-increase"
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseQuantity(getUniqueId(product));
                        }}
                      >
                        <Icons.Plus />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="h-8 w-8 font-raleway text-2xl grid place-content-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          decreaseQuantity(getUniqueId(product));
                        }}
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
        <p className="font-raleway text-xl">
          {currencyId}
          {totalAmount.toFixed(2)}
        </p>
        <button
          className="bg-scandiGreen text-white font-raleway text-lg py-2 px-4 w-full tracking-wide hover:bg-scandiGreen/80"
          onClick={async () => {
            const response = await insertOrder(cart);
            if (response) {
              resetCart();
              toggleCartModal();
            }
          }}
        >
          PLACE ORDER
        </button>
      </div>
    );
  }
}
