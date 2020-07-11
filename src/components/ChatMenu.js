"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Menu from "@material-ui/core/Menu";
// chat-react-elements
import {ChatList} from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import Typography from "@material-ui/core/Typography";

class ChatMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            anchorEl: PropTypes.object,
            onChatMenuClose: PropTypes.func.isRequired,
            chatList: PropTypes.array.isRequired,
            onChatSelect: PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <Menu
                anchorEl={this.props.anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={Boolean(this.props.anchorEl)}
                onClose={this.props.onChatMenuClose}>
                {this.props.chatList.length > 0 ? (
                    <ChatList onClick={this.props.onChatSelect} dataSource={this.props.chatList} />
                ) : (
                    <Typography color="inherit"> No Previous Chats </Typography>
                )}
            </Menu>
        );
    }
}

export default ChatMenu;
