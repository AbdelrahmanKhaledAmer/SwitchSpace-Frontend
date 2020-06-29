"use strict";

import React from "react";
import QuickNavMenu from "./QuickNavMenu";
import Sidebar from "./Sidebar";
// import Footer from "./Footer"; // TODO: ADD FOOTER
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {ToastContainer} from "react-toastify";

const styles = theme => ({
    body: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

class Page extends React.Component {
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
            classes: PropTypes.object.isRequired,
            children: PropTypes.object.isRequired,
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
        const {classes} = this.props;

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
                <section className={classes.body}>{this.props.children}</section>
                {/* <Footer /> */}
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>
        );
    }
}

export default withStyles(styles)(Page);
