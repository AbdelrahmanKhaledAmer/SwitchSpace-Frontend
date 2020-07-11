"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
// chat-react-elements
import {ChatList} from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import Typography from "@material-ui/core/Typography";

const styles = {
    chatMenu: {
        width: "300px",
    },
};
// Unfortunately, react-chat-elements package doesn't offer props for styling its components, so we had here to overwrite some CSS classes
const msgItemLightStyle = ".rce-citem:hover {background: rgba(0, 0, 0, 0.04)} .rce-citem-body--bottom-title {font-size: 14px}";
const msgItemDarkStyle =
    ".rce-citem:hover {background: rgba(255, 255, 255, 0.08)} .rce-citem {background: #424242} .rce-citem-body--bottom-title {color: white; font-size: 14px} .rce-citem-body--top-time {color: white}";

class ChatMenu extends React.Component {
    constructor(props) {
        super(props);

        this.msgItem = window.localStorage["dark"] ? msgItemDarkStyle : msgItemLightStyle;
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            anchorEl: PropTypes.object,
            onChatMenuClose: PropTypes.func.isRequired,
            chatList: PropTypes.array.isRequired,
            onChatSelect: PropTypes.func.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <style>{this.msgItem}</style>
                <Menu
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    keepMounted
                    transformOrigin={{vertical: "top", horizontal: "right"}}
                    open={Boolean(this.props.anchorEl)}
                    onClose={this.props.onChatMenuClose}>
                    {this.props.chatList.length > 0 ? (
                        <ChatList className={classes.chatMenu} onClick={this.props.onChatSelect} dataSource={this.props.chatList} />
                    ) : (
                        <Typography className={classes.chatMenu} color="inherit" align="center">
                            No Previous Chats
                        </Typography>
                    )}
                </Menu>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ChatMenu);
