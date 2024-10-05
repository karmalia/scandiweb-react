import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";

import Header from "../components/Header";
import { globalStore } from "../MobX/global-store";
import healthCheck from "../graphql/health-check";
import Icons from "../components/Icons";
import Spinner from "../components/shared/Spinner";

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
      console.log("response", response);
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
      <div className="mx-auto antialiased">
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
            <div className="relative">
              <main className="container mx-auto">{this.props.children}</main>
              {cartModal && (
                <div
                  className="w-full h-full bg-black/20 absolute top-0 left-0"
                  onClick={toggleCartModal}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Layout);
