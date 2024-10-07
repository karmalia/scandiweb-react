import { Component } from "react";
import Icons from "./Icons";
import { globalStore } from "../MobX/global-store";
import { observer } from "mobx-react";

type Props = {};

type State = {};
@observer
export default class Cart extends Component<Props, State> {
  state = {};

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {}

  render() {
    const {
      cartModal,
      cart,
      toggleCartModal,
      increaseQuantity,
      decreaseQuantity,
    } = globalStore;
    const { products, totalAmount, currencyId, totalItems } = cart;
    return (
      <div className="relative ">
        <button
          data-testid="cart-btn"
          onClick={toggleCartModal}
          className="bg-white relative"
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
