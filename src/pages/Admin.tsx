import { PureComponent } from "react";
import OrderTable from "../components/OrdersTable/OrdersTable";

export default class Admin extends PureComponent {
  render() {
    return (
      <div>
        <h1 className="px-4 pt-12 text-3xl font-raleway font-semibold">
          Dashboard
        </h1>
        <OrderTable />
      </div>
    );
  }
}
