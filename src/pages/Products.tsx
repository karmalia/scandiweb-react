import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Product } from "../types";
import { AxiosError } from "axios";
import getProducts from "../graphql/queries/get-products";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/shared/Spinner";

type Props = RouteComponentProps<{ category: string }>;
type State = {
  category: string | null;
  products: Product[];
  error: null | AxiosError;
  isLoading: boolean;
};

class Products extends Component<Props, State> {
  state: State = {
    category: null,
    products: [],
    error: null,
    isLoading: true,
  };

  public setProducts = (products: Product[]) => {
    if (Array.isArray(products)) {
      this.setState({ products, isLoading: false });
    } else {
      this.setState({
        error: new Error("Invalid data format") as AxiosError,
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    const { category } = this.props.match.params; // Get the initial ID from route parameters
    this.setState({ category: category });
    getProducts(this.setProducts, category).catch((error: AxiosError) => {
      this.setState({ error, isLoading: false });
    });
  }

  componentDidUpdate(prevProps: Props) {
    // Check if the route parameters have changed
    if (prevProps.match.params.category !== this.props.match.params.category) {
      const newCategory = this.props.match.params.category;
      this.setState({ isLoading: true });
      getProducts(this.setProducts, newCategory).catch((error: AxiosError) => {
        this.setState({ error, isLoading: false });
      });
      this.setState({ category: newCategory });
    }
  }

  render() {
    const { category, products, isLoading } = this.state;
    return (
      <div>
        <h1 className="pt-12 pb-6 text-3xl lg:text-4xl font-raleway capitalize  px-4">
          {category || "All"}
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:gap-2">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {isLoading && <Spinner />}
        </section>
      </div>
    );
  }
}

export default withRouter(Products);
