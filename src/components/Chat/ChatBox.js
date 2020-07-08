"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
//Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
// Material UI Icons
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
// chat-react-elements
import {MessageList} from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "350px",
        height: "450px",
        position: "fixed",
        bottom: 0,
        right: theme.spacing(8),
        zIndex: 10,
    },
    header: {
        background: theme.palette.header.backgroundColor(),
        height: "50px",
    },
    headerAvatar: {
        marginLeft: theme.spacing(1),
    },
    messageListContainer: {
        flex: 1,
        overflow: "auto",
        marginTop: theme.spacing(2),
    },
    messageInput: {
        marginLeft: theme.spacing(1),
    },
});

class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.messageListRef = React.createRef();
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            otherUserPicture: PropTypes.object.isRequired,
            otherUserName: PropTypes.string.isRequired,
            messages: PropTypes.array.isRequired,
            closeChat: PropTypes.func.isRequired,
            sendMessage: PropTypes.func.isRequired,
            onMessageInputChange: PropTypes.func.isRequired,
            messageInput: PropTypes.string.isRequired,
        };
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        // scrollTop sets the number of pixels that an element's content is scrolled vertically
        // scrollHeight is the height of an element's content, including content not visible on the screen due to overflow
        this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            this.props.sendMessage();
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.container} elevation={5}>
                <Paper className={classes.header} elevation={5}>
                    <Grid container>
                        <Grid item container xs spacing={1} alignItems="center">
                            <Grid item>
                                <Avatar className={classes.headerAvatar} src={this.props.otherUserPicture ? this.props.otherUserPicture.url : null} />
                            </Grid>
                            <Grid item>
                                <Typography color="inherit"> {this.props.otherUserName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={this.props.closeChat}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.messageListContainer} ref={this.messageListRef}>
                    <MessageList dataSource={this.props.messages} />
                </div>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField
                            className={classes.messageInput}
                            fullWidth
                            multiline={true}
                            value={this.props.messageInput}
                            placeholder="Type your message here ..."
                            onChange={this.props.onMessageInputChange}
                            onKeyDown={this.onKeyDown}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={this.props.sendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(ChatBox);
