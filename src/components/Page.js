"use strict";

import React from "react";

import Header from "./Header";
import { Footer } from "./Footer";
import PropTypes from "prop-types";
export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }
  // need to defince prop type for every function
  static get propTypes() {
    return {
      children: PropTypes.array,
    };
  }

  componentDidMount() {
    this.setState({
      title: document.title,
    });
  }

  render() {
    return (
      <section>
        <Header title={this.state.title} />
        {this.props.children}
        <Footer />
      </section>
    );
  }
}
