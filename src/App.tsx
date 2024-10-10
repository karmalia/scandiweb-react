import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Products from "./pages/Products";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import ProductDetails from "./pages/ProductDetails";
import healthCheck from "./graphql/queries/health-check";
import { Bounce, ToastContainer } from "react-toastify";
import Admin from "./pages/Admin";
class App extends Component {
  componentDidMount() {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&family=Roboto:wght@300;400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/admin" component={Admin} />

            <Route exact path={`/:category`} component={Products} />

            <Route
              exact
              path={`/:category/:productId`}
              component={ProductDetails}
            />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </Layout>
      </Router>
    );
  }
}

export default App;
