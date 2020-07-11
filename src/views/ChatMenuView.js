"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import ChatMenu from "../components/ChatMenu";
import Notification from "../components/Notification";
// Services
import ChatService from "../services/ChatService";

class ChatMenuView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatList: [],
            // when true notification appears
            notify: false,
            // must have value when notification appears
            notificationMsg: undefined,
            // values in "success", "error", "info", "warning"
            notificationSeverity: undefined,
        };

        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
    }

    static get propTypes() {
        return {
            anchorEl: PropTypes.object,
            onChatMenuClose: PropTypes.func.isRequired,
            onChatSelect: PropTypes.func.isRequired,
        };
    }

    async componentDidUpdate(prevProps) {
        if (this.props.anchorEl && this.props.anchorEl !== prevProps.anchorEl) {
            try {
                const chatListResp = await ChatService.getChatList();
                const chatList = chatListResp.data.data;
                let chatListFormatted = [];
                for (const chatListItem of chatList) {
                    chatListFormatted.push({
                        otherUserId: chatListItem.otherUserId,
                        avatar: chatListItem.otherUserPicture ? chatListItem.otherUserPicture.url : null,
                        title: chatListItem.otherUserName,
                        subtitle: chatListItem.lastMessage.content,
                        date: new Date(chatListItem.lastMessage.createdAt),
                        unread: chatListItem.unread,
                    });
                }
                this.setState({
                    chatList: chatListFormatted,
                });
            } catch (err) {
                this.notify(err, "error");
            }
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
        return (
            <React.Fragment>
                <ChatMenu
                    anchorEl={this.props.anchorEl}
                    onChatMenuClose={this.props.onChatMenuClose}
                    chatList={this.state.chatList}
                    onChatSelect={this.props.onChatSelect}
                />
                <Notification
                    notify={this.state.notify}
                    notificationMsg={this.state.notificationMsg}
                    severity={this.state.notificationSeverity}
                    handleClose={this.handleNotificationClose}
                />
            </React.Fragment>
        );
    }
}

export default ChatMenuView;
