import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Header from "./components/Header";
class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/" component={ProductDetails} />
            <Route path="*" component={() => <h2>404 Page Not Found</h2>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
