import React, { Component, createContext } from "react";
import { Category } from "../types";
import getCategories from "../graphql/get-categories";
import { AxiosError } from "axios";

export type ContextState = {
  categories: Category[];
  cartModal: boolean;
  isLoading: boolean;
  error: AxiosError | null;
  toggleCartModal?: () => void;
};

const GlobalContext = createContext<ContextState>({
  categories: [],
  isLoading: true,
  error: null,
  cartModal: false,
  toggleCartModal: () => {},
});

class ContextProvider extends Component<
  {
    children: React.ReactNode;
  },
  ContextState
> {
  state: ContextState = {
    categories: [],
    isLoading: true,
    error: null,
    cartModal: false,
  };

  public setLinks = (links: Category[]) => {
    if (Array.isArray(links)) {
      this.setState({ categories: links, isLoading: false });
    } else {
      this.setState({
        error: new Error("Invalid data format") as AxiosError,
        isLoading: false,
      });
    }
  };

  public toggleCartModal = () => {
    this.setState({ cartModal: !this.state.cartModal });
  };

  componentDidMount() {
    getCategories(this.setLinks).catch((error: AxiosError) => {
      this.setState({ error, isLoading: false });
    });
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{ ...this.state, toggleCartModal: this.toggleCartModal }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

// Export the context and the provider
export { GlobalContext, ContextProvider };
