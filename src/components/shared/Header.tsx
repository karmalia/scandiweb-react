import React, { Component } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Category } from "../../types";
import Icons from "./Icons";
import { AxiosError } from "axios";
import getFirstPathSegment from "../../utils/get-first-path-segment";
import Cart from "../Cart";
import { globalStore } from "../../MobX/global-store";
import { observer } from "mobx-react";
import getCategories from "../../graphql/queries/get-categories";

type Props = RouteComponentProps<{ category: string }>;

type State = {
  categories: Category[];
  error: null | AxiosError;
  isLoading: boolean;
  category: string;
};
@observer
class Header extends Component<Props, State> {
  state: State = {
    error: null,
    isLoading: true,
    category: "/",
    categories: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    getCategories()
      .then((data) => {
        if (data) {
          this.setState({ categories: data, isLoading: false });
        } else {
          this.setState({
            error: new Error("Invalid data format") as AxiosError,
            isLoading: false,
          });
        }
      })
      .catch((error: AxiosError) => {
        this.setState({ error, isLoading: false });
      });
  }

  componentDidUpdate(prevProps: Props) {
    // Check if the category in the URL has changed

    if (prevProps.location.pathname !== this.props.location.pathname) {
      const newCategory = this.props.location.pathname || "all";
      // Update the state with the new category value
      this.setState({ category: newCategory });
    }
  }

  render() {
    const { category, categories } = this.state;
    console.log("getFirstPathSegment(category)", getFirstPathSegment(category));
    if (categories.length === 0) {
      return <div>No categories found</div>;
    }

    return (
      <nav className="container mx-auto flex justify-between items-center px-4">
        <ul className="text-xs md:text-lg flex gap-4 h-14 md:h-20 font-raleway font-semibold flex-1">
          <li>
            <Link
              to={`/`}
              className={`h-full min-w-16 grid place-content-center uppercase tracking-wider ${
                category === "/"
                  ? "text-scandiGreen border-b-2 border-scandiGreen"
                  : "text-black"
              }`}
              data-testid={
                getFirstPathSegment(category) === null
                  ? "active-category-link"
                  : "category-link"
              }
            >
              {"All"}
            </Link>
          </li>
          {categories.map((link: Category) => {
            const isActive = getFirstPathSegment(category) === link.name; // Strict comparison to avoid issues
            return (
              <li key={link.id}>
                <Link
                  to={`/${link.name}`}
                  data-testid={
                    isActive ? "active-category-link" : "category-link"
                  }
                  className={`h-full min-w-16 grid place-content-center tracking-wider uppercase ${
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
        <img src="/shop-logo.svg" alt="Shop Logo" className="hidden md:block" />
        <div className="flex-1 flex justify-end pr-4">
          <Cart />
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
