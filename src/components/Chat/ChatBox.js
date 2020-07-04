"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
// Chat
import {ChatFeed, Message} from "react-chat-ui";

const styles = theme => ({
    top: {
        marginTop: theme.spacing(20),
    },
    chatContainer: {
        width: "200px",
        height: "200px",
    },
});

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                new Message({
                    id: 1,
                    message: "I'm the recipient! (The person you're talking to)",
                }), // Gray bubble
                new Message({id: 0, message: "I'm you -- the blue bubble!"}), // Blue bubble
            ],
        };
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.chatContainer}>
                <ChatFeed
                    messages={this.state.messages} // Boolean: list of message objects
                    isTyping={this.state.is_typing} // Boolean: is the recipient typing
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName // show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
                    bubbleStyles={{
                        text: {
                            fontSize: 18,
                        },
                        chatbubble: {
                            borderRadius: 70,
                            padding: 40,
                        },
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ChatBox);
