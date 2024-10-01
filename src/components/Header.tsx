import React, { Component } from "react";
import { Link } from "react-router-dom";
import graphql from "../http/http";
import Queries from "../queries/queries.class";
import getCategories from "../graphql/get-categories";
import { Category } from "../types";
import { Axios, AxiosError } from "axios";

const Query = new Queries();

type Props = {};

type State = {
  links: Category[];
  error: null | AxiosError;
  isLoading: boolean;
};

export default class Header extends Component<Props, State> {
  state = {
    links: [],
    error: null,
    isLoading: true,
  };

  public setLinks = (links: Category[]) => {
    if (Array.isArray(links)) {
      // Ensure `links` is a valid array before updating state
      this.setState({ links, isLoading: false });
    } else {
      this.setState({
        error: new Error("Invalid data format") as AxiosError,
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    getCategories(this.setLinks).catch((error: AxiosError) => {
      this.setState({ error, isLoading: false });
    });
  }

  render() {
    const { links, error, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (links.length === 0) {
      return <div>No categories found</div>;
    }

    return (
      <nav>
        <ul>
          {links.map((link: Category) => (
            <li key={link.id}>
              <Link to={`/category/${link.id}`}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
