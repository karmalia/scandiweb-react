import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Header from "../components/Header";

import { globalStore } from "../context/global-store";
import { observer } from "mobx-react";
type Props = RouteComponentProps & {
  children: React.ReactNode;
};
@observer
class Layout extends Component<Props> {
  state = {};

  render() {
    const { toggleCartModal } = globalStore;
    return (
      <div className="mx-auto antialiased">
        {/* Pass down the match, location, and history props to Header */}
        <Header {...this.props} />
        <div className="relative">
          <main className="container mx-auto">{this.props.children}</main>
          {globalStore.cartModal && (
            <div
              className="w-full h-full bg-black/20 absolute top-0 left-0"
              onClick={toggleCartModal}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
