import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Header from "../components/Header";
import { ContextState, GlobalContext } from "../context/global-context";

type Props = RouteComponentProps & {
  children: React.ReactNode;
};

class Layout extends Component<Props> {
  state = {};
  static contextType = GlobalContext;
  render() {
    const { cartModal } = this.context as ContextState;
    return (
      <div>
        <div className="mx-auto">
          {/* Pass down the match, location, and history props to Header */}
          <Header {...this.props} />
          <div className="relative">
            <main className="container mx-auto">{this.props.children}</main>
            {cartModal && (
              <div className="w-full h-full bg-black/20 absolute top-0 left-0" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
