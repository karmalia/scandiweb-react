import React, { Component } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react";

import Header from "../components/shared/Header";
import { globalStore } from "../MobX/global-store";
import healthCheck from "../graphql/queries/health-check";
import Icons from "../components/shared/Icons";
import Spinner from "../components/shared/Spinner";
import CartContent from "../components/CartContent";

type Props = RouteComponentProps & {
  children: React.ReactNode;
};

type State = {
  status: string | null;
  isLoading: boolean;
};

@observer
class Layout extends Component<Props, State> {
  state: State = {
    status: null,
    isLoading: true,
  };

  componentDidMount() {
    this.performHealthCheck();
  }

  async performHealthCheck() {
    try {
      const response = await healthCheck();
      this.setState({ status: response ? "OK" : null });
    } catch (error) {
      console.error("Error fetching categories:", error);
      this.setState({ status: null });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { toggleCartModal, cartModal } = globalStore;
    const { status, isLoading } = this.state;

    return (
      <>
        {isLoading && <Spinner />}
        {!isLoading && status === null && (
          <div className="h-screen w-screen flex justify-center items-center font-raleway">
            <div className="text-red-500 text-center flex flex-col items-center justify-center">
              <Icons.Alert className={"w-52 h-52 text-red-500"} />
              <div className="text-xl font-semibold">Error fetching data</div>
              <p className="text-sm">
                Please try refreshing the page or contact support if the issue
                persists.
              </p>
            </div>
          </div>
        )}
        {status && (
          <>
            <Header {...this.props} />
            <div className="relative mx-auto antialiased min-h-dvh h-auto border border-transparent">
              <main className="container mx-auto">{this.props.children}</main>
              <Link to="/admin">
                <button className="fixed bottom-4 right-4 bg-scandiGreen text-white font-semibold px-4 py-2 rounded-lg">
                  DASHBOARD
                </button>
              </Link>
              {cartModal && (
                <div
                  className="w-full h-full min-h-dvh bg-black/20 absolute top-0 left-0 flex justify-end items-start animate-fade animate-once animate-ease-out"
                  onClick={toggleCartModal}
                >
                  <div className=" flex items-end justify-end w-full mx-auto container">
                    <CartContent />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default withRouter(Layout);
