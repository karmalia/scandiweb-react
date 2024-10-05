import React, { Component } from "react";

type Props = {};

type State = {};

export default class Spinner extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-24 w-24 border-4 border-scandiGreen rounded-full border-r-transparent border-l-transparent animate-spin" />
      </div>
    );
  }
}
