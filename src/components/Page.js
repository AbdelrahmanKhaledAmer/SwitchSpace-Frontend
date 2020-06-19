"use strict";

import React from "react";
import QuickNavMenu from "./QuickNavMenu";
import Sidebar from "./Sidebar";
import { Footer } from "./Footer";
import PropTypes from "prop-types";
export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      isAuthorized: false, // TODO: Get token
      drawerIsOpen: false,
      expanded: false,
    };

    this.sidebarToggle = this.sidebarToggle.bind(this);
    this.expandToggle = this.expandToggle.bind(this);
    this.authorizationToggle = this.authorizationToggle.bind(this);
  }
  // need to defince prop type for every function
  static get propTypes() {
    return {
      children: PropTypes.object,
    };
  }

  sidebarToggle() {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen,
    });
  }

  expandToggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  // TODO: TESTING ONLY
  authorizationToggle() {
    this.setState({
      isAuthorized: !this.state.isAuthorized,
    });
  }

  componentDidMount() {
    this.setState({
      title: document.title,
    });
  }

  render() {
    return (
      <section>
        <QuickNavMenu
          title={this.state.title}
          isAuthorized={this.state.isAuthorized}
          sidebarToggle={this.sidebarToggle}
          unreadMessages={3} //TODO: GET FROM SERVER AT LOGIN
          authorizationToggle={this.authorizationToggle}
        />
        <Sidebar
          isOpen={this.state.drawerIsOpen}
          isAuthorized={this.state.isAuthorized}
          sidebarToggle={this.sidebarToggle}
          expanded={this.state.expanded}
          expandToggle={this.expandToggle}
        />
        {this.props.children}
        <Footer />
      </section>
    );
  }
}
