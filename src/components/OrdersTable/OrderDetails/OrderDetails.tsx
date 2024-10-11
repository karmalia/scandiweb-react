import React, { Component } from "react";
import getOrderById from "../../../graphql/queries/get-order-byid";
import { toast } from "react-toastify";
import { I_OrderDetails } from "../../../types";
import rejectOrder from "../../../graphql/mutations/reject-order";
import confirmOrder from "../../../graphql/mutations/confirm-order";
import { observer } from "mobx-react";
import { globalStore } from "../../../MobX/global-store";
import { twMerge } from "tailwind-merge";

type Props = {
  orderId: string;
  toggleExpand: () => void;
};

type OrderDetailsState = {
  orderDetails: null | I_OrderDetails;
  isLoading: boolean;
};

@observer
class OrderDetails extends Component<Props, OrderDetailsState> {
  state: OrderDetailsState = {
    orderDetails: null,
    isLoading: true,
  };

  componentDidMount() {
    // Simulate an API call to fetch order details by ID
    this.fetchOrderDetails()
      .then((orderDetails) => {
        this.setState({ orderDetails, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        toast.error("Error fetching order details");
        this.setState({ orderDetails: null, isLoading: false });
      });
  }

  fetchOrderDetails = async () => {
    const { orderId } = this.props;
    const orderDetails = await getOrderById(orderId);
    return orderDetails;
  };

  render() {
    const { toggleExpand } = this.props;
    const { orderDetails, isLoading } = this.state;
    const { fetchOrders } = globalStore;
    const isConfirmed = orderDetails?.status === "confirmed";
    const isPending = orderDetails?.status === "pending";
    const isRejected = orderDetails?.status === "rejected";
    // Render Loading State or Order Details
    if (!orderDetails && isLoading)
      return <div className="p-4">Loading order details...</div>;

    if (!orderDetails && !isLoading)
      return <div className="p-4">No order details found</div>;

    if (orderDetails) {
      return (
        <div className="p-4">
          <div className="mb-2 flex justify-between">
            <p>
              <span className="font-bold">Total Amount:</span>{" "}
              {orderDetails.currencySymbol}
              {orderDetails.totalAmount}
            </p>
            <p className="space-x-2">
              {isPending && (
                <button
                  onClick={async () => {
                    if (isConfirmed) return;
                    try {
                      await confirmOrder(orderDetails.orderId.toString());
                      await fetchOrders();
                      toggleExpand();
                      toast.success("Order Confirming successfully");
                    } catch (error) {
                      console.log("Error accepting order:", error);
                      toast.error("Error Confirming order");
                    }
                  }}
                  disabled={isConfirmed}
                  className={twMerge(
                    "bg-scandiGreen hover:bg-scandiGreen/80 min-w-24 text-white p-2",
                    isConfirmed &&
                      "cursor-not-allowed bg-green-300/50 hover:bg-green-300/50"
                  )}
                >
                  {isConfirmed ? "CONFIRMED" : "CONFIRM"}
                </button>
              )}
              {isPending && (
                <button
                  onClick={async () => {
                    try {
                      await rejectOrder(orderDetails.orderId.toString());
                      await fetchOrders();
                      toggleExpand();
                      toast.success("Order rejected successfully");
                    } catch (error) {
                      toast.error("Error rejecting order");
                      console.log("Error accepting order:", error);
                    }
                  }}
                  className="bg-red-400 hover:bg-red-400/80 min-w-24 text-white p-2"
                >
                  REJECT
                </button>
              )}
              {!isPending && (
                <span
                  className={twMerge(
                    "font-semibold",
                    isConfirmed ? "text-green-500" : "text-red-500"
                  )}
                >
                  {isRejected ? "REJECTED" : "CONFIRMED"}
                </span>
              )}
            </p>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold">Products:</h3>
            {orderDetails.products.map((product) => (
              <div key={product.productId} className="border p-2 mt-2">
                <p>
                  <span className="font-bold">Product Name:</span>{" "}
                  {product?.productName || "N/A"}
                </p>
                <p>
                  <span className="font-bold">Quantity:</span>{" "}
                  {product?.quantity || 0}
                </p>
                <p>
                  <span className="font-bold">Price:</span> $
                  {product?.price || 0}
                </p>
                {product?.attributes?.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Attributes:</h4>
                    <ul className="ml-4 list-disc">
                      {product.attributes.map((attr) => (
                        <li key={attr.attributeId}>
                          {attr.attributeName}: {attr.attributeValue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default OrderDetails;
