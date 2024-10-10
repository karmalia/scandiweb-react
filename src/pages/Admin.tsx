import React, { Component } from "react";
import OrderTable from "../components/OrdersTable/OrdersTable";

type Props = {};

type State = {};

export default class Admin extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <h1 className="pt-12 text-3xl font-raleway">Dashboard</h1>
        <OrderTable />
      </div>
    );
  }
}
