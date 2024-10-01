import React, { Component } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Category } from "../types";
import Icons from "./Icons";
import { ContextState, GlobalContext } from "../context/global-context";
import { AxiosError } from "axios";
import getFirstPathSegment from "../utils/get-first-path-segment";
import Cart from "./Cart";

type Props = RouteComponentProps<{ category: string }>;

type State = {
  links: Category[];
  error: null | AxiosError;
  isLoading: boolean;
  category: string; // Change to non-nullable `string`
};

class Header extends Component<Props, State> {
  state: State = {
    links: [],
    error: null,
    isLoading: true,
    category: "all", // Set initial category to "all" instead of null
  };

  componentDidMount() {
    const pathname = this.props.location.pathname;

    // Set category state to the initial route parameter or default to "all"
    this.setState({ category: pathname || "all" });
  }

  componentDidUpdate(prevProps: Props) {
    // Check if the category in the URL has changed

    if (prevProps.location.pathname !== this.props.location.pathname) {
      const newCategory = this.props.location.pathname || "all";
      // Update the state with the new category value
      this.setState({ category: newCategory });
      console.log("Route parameter has changed to:", newCategory);
    }
  }

  static contextType = GlobalContext;

  render() {
    const { categories, isLoading, error } = this.context as ContextState;
    const { category } = this.state;
    console.log("Rendering Header with category:", category);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (categories.length === 0) {
      return <div>No categories found</div>;
    }

    return (
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-4 h-20 font-raleway font-semibold tracking-wide flex-1">
          <Link
            to={`/`}
            className={`h-full min-w-16 grid place-content-center uppercase ${
              category === "/"
                ? "text-scandiGreen border-b-2 border-scandiGreen"
                : "text-black"
            }`}
          >
            {"All"}
          </Link>
          {categories.map((link: Category) => {
            const isActive = getFirstPathSegment(category) === link.name; // Strict comparison to avoid issues
            return (
              <li key={link.id}>
                <Link
                  to={`/${link.name}`}
                  data-testid={
                    isActive ? "active-category-link" : "category-link"
                  }
                  className={`h-full min-w-16 grid place-content-center uppercase ${
                    isActive
                      ? "text-scandiGreen border-b-2 border-scandiGreen"
                      : "text-black"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <img src="/shop-logo.svg" alt="Shop Logo" />
        <div className="flex-1 flex justify-end">
          <Cart />
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
