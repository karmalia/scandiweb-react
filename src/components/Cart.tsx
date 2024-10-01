import React, { Component, useContext } from "react";
import { ContextState, GlobalContext } from "../context/global-context";
import Icons from "./Icons";

type Props = {};

type State = {};

export default class Cart extends Component<Props, State> {
  state = {};
  static contextType = GlobalContext;
  render() {
    const { toggleCartModal, cartModal } = this.context as ContextState;
    return (
      <div className="relative">
        <button onClick={toggleCartModal} className="bg-white">
          <Icons.Cart />
        </button>
        {cartModal && (
          <div className="bg-white absolute z-10 w-[325px] h-[400px] top-12 right-0 translate-x-[10%] p-4">
            <h1 className="text-2xl font-raleway">
              <span className="font-bold">My Bag,</span> 3 items
            </h1>
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    );
  }
}
