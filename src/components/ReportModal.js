"use strict";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReportIcon from "@material-ui/icons/Report";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Zoom from "@material-ui/core/Zoom";

import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: "1",
        backgroundColor: "#659dbd",
    },
    form: {
        width: "100%", //TODO: Fix IE 11 issue.
        marginTop: "1",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#659dbd",
        color: "#fbeec1",
        "&:hover": {
            background: "#558dad",
        },
    },
    centerFold: {
        textAlign: "center",
    },
});

class ReportModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: "",
            reportEmpty: true,
        };
        this.onReportChange = this.onReportChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            modalOpen: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
            submitReport: PropTypes.func.isRequired,
        };
    }
    onReportChange(e) {
        const value = e.currentTarget.value;
        this.setState({report: value});
        if (value.length == 0) {
            this.setState({reportEmpty: true});
        } else {
            this.setState({reportEmpty: false});
        }
    }
    submitHandler() {
        this.props.submitReport(this.state.report);
    }

    render() {
        const {classes} = this.props;

        return (
            <Dialog
                aria-labelledby="form-dialog-title"
                open={this.props.modalOpen}
                onClose={() => this.props.onClose()}
                TransitionComponent={Zoom}
                transitionDuration={500}
                maxWidth="sm"
                fullWidth>
                <DialogContent>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <ReportIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Report
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={8}
                                    id="report"
                                    label="Report"
                                    name="report"
                                    autoComplete="Report Text"
                                    onChange={this.onReportChange}
                                    autoFocus
                                    error={this.state.reportEmpty}
                                    helperText={this.state.reportEmpty ? "Report Cannot be Empty" : ""}
                                />
                            </form>
                        </div>
                    </Container>
                </DialogContent>
                <DialogActions className={classes.centerFold}>
                    <Button variant="contained" disabled={this.state.reportEmpty} onClick={this.submitHandler} color="primary">
                        Submit report
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default withRouter(withStyles(styles)(ReportModal));
