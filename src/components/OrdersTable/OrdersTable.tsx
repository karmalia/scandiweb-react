import React, { Component } from "react";
import RowComponent from "./RowComponent/RowComponent";
import getOrders from "../../graphql/queries/get-orders";
import { I_Order } from "../../types";
import { observer } from "mobx-react";
import { globalStore } from "../../MobX/global-store";

// Main OrderTable Component using Class
@observer
class OrderTable extends Component {
  componentDidMount(): void {
    globalStore.fetchOrders();
  }

  render() {
    const { orders } = globalStore;

    return (
      <div className="w-full max-w-6xl mx-auto mt-8 p-4">
        <div className="flex bg-scandiGreen text-white font-bold p-4 rounded-t-lg">
          <div className="w-1/6 text-center">Order ID</div>
          <div className="w-1/6 text-center">Total Amount</div>
          <div className="w-1/6 text-center">Status</div>
          <div className="w-1/4 text-center">Created At</div>
          <div className="w-1/4 text-center">Updated At</div>
        </div>
        {orders &&
          orders.map((order) => (
            <RowComponent key={order.orderId} order={order} />
          ))}
        {!orders && <div className="p-4">No orders found</div>}
      </div>
    );
  }
}

export default OrderTable;
