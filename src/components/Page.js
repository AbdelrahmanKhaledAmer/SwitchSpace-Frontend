"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
// Components
import QuickNavMenu from "./QuickNavMenu";
import Sidebar from "./Sidebar";
import ChatBoxView from "../views/ChatBoxView";
import Notification from "../components/Notification";
// import Footer from "./Footer"; // TODO: ADD FOOTER
// Services
import ChatService from "../services/ChatService";
import UserAuthService from "../services/UserAuthService";
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
            chatReceiverIdFromMenu: "",
            chatMenuAnchorEl: null,
            unreadMessages: 0,
            // when true notification appears
            notify: false,
            // must have value when notification appears
            notificationMsg: undefined,
            // values in "success", "error", "info", "warning"
            notificationSeverity: undefined,
        };

        this.sidebarToggle = this.sidebarToggle.bind(this);
        this.expandToggle = this.expandToggle.bind(this);
        this.handleChatMenuOpen = this.handleChatMenuOpen.bind(this);
        this.handleChatMenuClose = this.handleChatMenuClose.bind(this);
        this.handleChatSelect = this.handleChatSelect.bind(this);
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.setUnreadMessages = this.setUnreadMessages.bind(this);
    }

    // need to defince prop type for every function
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            children: PropTypes.object.isRequired,
            // chatReceiverIdFromPost is not a required prop
            chatReceiverIdFromPost: PropTypes.string,
        };
    }

    componentDidMount() {
        this.setState({
            title: document.title,
        });

        if (UserAuthService.isNormalUser()) {
            this.setUnreadMessages();
        }
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

    handleChatMenuOpen(event) {
        this.setState({chatMenuAnchorEl: event.currentTarget});
    }

    handleChatMenuClose() {
        this.setState({chatMenuAnchorEl: null});
    }

    handleChatSelect(selectedChat) {
        this.setState(
            {
                // close chat menu in navbar
                chatMenuAnchorEl: null,
                // open chat widget
                chatReceiverIdFromMenu: selectedChat.otherUserId,
            },
            () => {
                this.setState({
                    chatReceiverIdFromMenu: "",
                });
            }
        );
    }

    async setUnreadMessages() {
        try {
            const unreadMessagesResp = await ChatService.getUnreadMessages();
            const unreadMessages = unreadMessagesResp.data.data;
            this.setState({unreadMessages: unreadMessages.unreadMessages});
        } catch (err) {
            this.notify(err, "error");
        }
    }

    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }

    // Reset notification state must be included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }

    render() {
        const {classes} = this.props;

        return (
            <section>
                <QuickNavMenu
                    isAuthorized={this.state.isAuthorized}
                    sidebarToggle={this.sidebarToggle}
                    unreadMessages={this.state.unreadMessages}
                    chatMenuAnchorEl={this.state.chatMenuAnchorEl}
                    onChatMenuOpen={this.handleChatMenuOpen}
                    onChatMenuClose={this.handleChatMenuClose}
                    onChatSelect={this.handleChatSelect}
                />
                <ChatBoxView
                    receiverIdFromPost={this.props.chatReceiverIdFromPost}
                    receiverIdFromMenu={this.state.chatReceiverIdFromMenu}
                    setUnreadMessages={this.setUnreadMessages}
                />
                <Sidebar
                    isOpen={this.state.drawerIsOpen}
                    sidebarToggle={this.sidebarToggle}
                    expanded={this.state.expanded}
                    expandToggle={this.expandToggle}
                />
                <section className={classes.body}>{this.props.children}</section>
                <Notification
                    notify={this.state.notify}
                    notificationMsg={this.state.notificationMsg}
                    severity={this.state.notificationSeverity}
                    handleClose={this.handleNotificationClose}
                />
                {/* <Footer /> */}
            </section>
        );
    }
}

export default withStyles(styles)(Page);
