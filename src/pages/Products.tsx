import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Product } from "../types";
import { AxiosError } from "axios";
import getProducts from "../graphql/get-products";
import ProductCard from "../components/ProductCard";

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
      getProducts(this.setProducts, newCategory).catch((error: AxiosError) => {
        this.setState({ error, isLoading: false });
      });
      this.setState({ category: newCategory });
    }
  }

  render() {
    const { category, products } = this.state;
    console.log("products", products);
    return (
      <div>
        <h1 className="py-12 text-4xl font-raleway capitalize ">
          {category || "All"}
        </h1>
        <section className="grid grid-cols-3 gap-12 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    );
  }
}

export default withRouter(Products);
