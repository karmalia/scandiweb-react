import React, { Component } from "react";
import { I_Order } from "../../../types";
import OrderDetails from "../OrderDetails/OrderDetails";
import { twMerge } from "tailwind-merge";

type Props = {
  order: I_Order;
};

type State = {
  isExpanded: boolean;
};

function returnStatusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "text-green-500";
    case "pending":
      return "text-orange-400";
    case "rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

class RowComponent extends Component<Props, State> {
  state = {
    isExpanded: false,
  };

  toggleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  render() {
    const { order } = this.props;
    return (
      <>
        <div
          className="flex text-md border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
          onClick={this.toggleExpand}
        >
          <div className="w-1/6 text-center p-4">{order.orderId}</div>
          <div className="w-1/6 text-center p-4">${order.totalAmount}</div>
          <div
            className={twMerge(
              "w-1/6 text-center p-4 uppercase font-medium font-roboto",
              returnStatusColor(order.status)
            )}
          >
            {order.status}
          </div>
          <div className="w-1/4 text-center p-4">
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className="w-1/4 text-center p-4">
            {new Date(order.updatedAt).toLocaleString()}
          </div>
        </div>
        {this.state.isExpanded && (
          <div className="bg-gray-100/30">
            <OrderDetails orderId={order.orderId.toString()} />
          </div>
        )}
      </>
    );
  }
}

export default RowComponent;
