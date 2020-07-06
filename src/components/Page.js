"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
// Components
import QuickNavMenu from "./QuickNavMenu";
import Sidebar from "./Sidebar";
// import Footer from "./Footer"; // TODO: ADD FOOTER
// MISC
const styles = theme => ({
    body: {
        paddingTop: theme.spacing(10), // navbar padding
        paddingBottom: theme.spacing(2), // footer padding
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
                    isAuthorized={this.state.isAuthorized}
                    sidebarToggle={this.sidebarToggle}
                    unreadMessages={3} //TODO: GET FROM SERVER AT LOGIN
                />
                <Sidebar
                    isOpen={this.state.drawerIsOpen}
                    sidebarToggle={this.sidebarToggle}
                    expanded={this.state.expanded}
                    expandToggle={this.expandToggle}
                />
                <section className={classes.body}>{this.props.children}</section>
                {/* <Footer /> */}
            </section>
        );
    }
}

export default withStyles(styles)(Page);
