import { Component } from "react";
import Icons from "./shared/Icons";
import { globalStore } from "../MobX/global-store";
import { observer } from "mobx-react";

@observer
export default class Cart extends Component {
  render() {
    const { cart, toggleCartModal } = globalStore;
    const { products, totalAmount, currencyId, totalItems } = cart;
    return (
      <div className="relative ">
        <button
          data-testid="cart-btn"
          onClick={(e: any) => {
            toggleCartModal();
          }}
          className="bg-white relative z-10"
        >
          <Icons.Cart />
          <div
            data-testid="cart-item-amount"
            className="absolute -top-2 -right-4 bg-black text-white text-sm w-5 h-5 grid place-content-center rounded-full"
          >
            {totalItems}
          </div>
        </button>
      </div>
    );
  }
}
