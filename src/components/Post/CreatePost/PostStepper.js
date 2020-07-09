"use strict";
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Container from "@material-ui/core/Container";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
// Material UI Icons
import ImageIcon from "@material-ui/icons/Image";
import Check from "@material-ui/icons/Check";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// Components
import Page from "../../Page";
import PostDetails from "../PostDetails/PostDetails";
import ItemForm from "./ItemForm";
import LocationModal from "./LocationModal";
// MISC
import clsx from "clsx";

const useQontoStepIconStyles = makeStyles({
    root: {
        color: "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center",
    },
    active: {
        color: "#784af4",
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
    completed: {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}>
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles(theme => ({
    alternativeLabel: {
        top: 22,
    },
    active: {
        "& $line": {
            backgroundColor: theme.palette.button.backgroundColor(),
        },
    },
    completed: {
        "& $line": {
            backgroundColor: theme.palette.button.backgroundColor(),
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.contrastObject.backgroundColor,
        borderRadius: 1,
    },
}))(StepConnector);

const useColorlibStepIconStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: theme.palette.button.backgroundColor(),
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
        backgroundColor: theme.palette.button.backgroundColor(),
    },
}));

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <ArrowUpwardIcon />,
        2: <ArrowDownwardIcon />,
        3: <DoneAllIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}>
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const styles = theme => ({
    root: {
        width: "90%",
        // marginTop: theme.spacing(7),
        margin: "0 auto",
        paddingBottom: theme.spacing(2),
        borderRadius: "10px",
    },
    button: {
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        margin: theme.spacing(0, 1),
        marginTop: theme.spacing(1),
    },
    formButton: {
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        marginTop: theme.spacing(1),
    },
    formButtonError: {
        backgroundColor: theme.palette.button.error,
        color: theme.palette.button.textColor(),
        marginTop: theme.spacing(1),
    },
    bottom: {
        textAlign: "center",
    },
    input: {
        display: "none",
    },
});

class PostStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            itemOwned: {
                title: "",
                description: "",
                category: "",
                subcategory: "",
                modelYear: "",
                condition: "",
            },
            itemDesired: {
                title: "",
                description: "",
                category: "",
                subcategory: "",
                modelYear: "",
                condition: "",
            },
            photos: [],
            exchangeLocation: {
                type: "Point",
                coordinates: [],
            },
            itemOwnedError: {
                title: "",
                category: "",
                subcategory: "",
                condition: "",
                exchangeLocation: "",
                photos: "",
            },
            itemDesiredError: {
                title: "",
                category: "",
                subcategory: "",
                condition: "",
            },
            locationModalOpen: false,
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.onItemOwnedChange = this.onItemOwnedChange.bind(this);
        this.onItemDesiredChange = this.onItemDesiredChange.bind(this);
        this.toggleLocationModal = this.toggleLocationModal.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.validateItemOwnedForm = this.validateItemOwnedForm.bind(this);
        this.validateItemDesiredForm = this.validateItemDesiredForm.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            categories: PropTypes.array.isRequired,
            submit: PropTypes.func.isRequired,
        };
    }

    makePost() {
        let postPhotos = [];
        this.state.photos.forEach(photo => {
            postPhotos.push({url: URL.createObjectURL(photo)});
        });
        let post = {
            itemOwned: this.state.itemOwned,
            itemDesired: this.state.itemDesired,
            exchangeLocation: this.state.exchangeLocation,
            photos: postPhotos,
        };
        return post;
    }

    async handleNext() {
        if (this.state.activeStep == 2) {
            let itemOwned = this.state.itemOwned;
            if (!itemOwned.modelYear) {
                itemOwned.modelYear = undefined;
            }
            let itemDesired = this.state.itemDesired;
            if (!itemDesired.modelYear) {
                itemDesired.modelYear = undefined;
            }
            let formData = new FormData();
            formData.append("itemOwned", JSON.stringify(itemOwned));
            formData.append("itemDesired", JSON.stringify(itemDesired));
            formData.append("exchangeLocation", JSON.stringify(this.state.exchangeLocation));
            this.state.photos.map((file, index) => {
                formData.append(`postPicture[${index}]`, file);
            });
            this.props.submit(formData);
        } else {
            if ((this.state.activeStep == 0 && !this.validateItemOwnedForm()) || (this.state.activeStep == 1 && !this.validateItemDesiredForm())) {
                return;
            }
            this.setState({
                activeStep: this.state.activeStep + 1,
            });
        }
    }

    validateItemDesiredForm() {
        let res = true;
        let itemDesiredError = {
            title: "",
            category: "",
            subcategory: "",
            condition: "",
        };
        if (this.state.itemDesired.title == "") {
            itemDesiredError.title = "What's the item's name?";
            res = false;
        }
        if (this.state.itemDesired.condition == "") {
            itemDesiredError.condition = "What condition should it be in?";
            res = false;
        }
        if (this.state.itemDesired.category != "other" && this.state.itemDesired.subcategory == "") {
            if (this.state.itemDesired.category == "") {
                itemDesiredError.category = "What's the item's category?";
            } else {
                itemDesiredError.subcategory = "What's the item's subcategory?";
            }
            res = false;
        }
        this.setState({
            itemDesiredError: {
                ...itemDesiredError,
            },
        });
        return res;
    }

    validateItemOwnedForm() {
        let res = true;
        let itemOwnedError = {
            title: "",
            category: "",
            subcategory: "",
            condition: "",
            exchangeLocation: "",
            photos: "",
        };
        if (this.state.itemOwned.title == "") {
            itemOwnedError.title = "What's your item's name?";
            res = false;
        }
        if (this.state.itemOwned.condition == "") {
            itemOwnedError.condition = "What your item's condition?";
            res = false;
        }
        if (this.state.itemOwned.category != "other" && this.state.itemOwned.subcategory == "") {
            if (this.state.itemOwned.category == "") {
                itemOwnedError.category = "What's your item's category?";
            } else {
                itemOwnedError.subcategory = "What's your item's subcategory?";
            }
            res = false;
        }
        if (this.state.exchangeLocation.coordinates.length != 2) {
            itemOwnedError.exchangeLocation = "Where would you like the exchange to take place?";
            res = false;
        }
        if (this.state.photos.length < 1 || this.state.photos.length > 3) {
            itemOwnedError.photos = "You need to have at least one photo and at most three.";
            res = false;
        }
        this.setState({
            itemOwnedError: {
                ...itemOwnedError,
            },
        });
        return res;
    }

    handleBack() {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    }

    onItemOwnedChange(item) {
        this.setState({
            itemOwned: item,
        });
    }

    onItemDesiredChange(item) {
        this.setState({
            itemDesired: item,
        });
    }

    toggleLocationModal() {
        this.setState({
            locationModalOpen: !this.state.locationModalOpen,
        });
    }

    setLocation(lat, lng) {
        this.setState({
            exchangeLocation: {
                ...this.state.exchangeLocation,
                coordinates: [lng, lat],
            },
        });
        this.toggleLocationModal();
    }

    onImageUpload(e) {
        let photos = [];
        for (let i = 0; i < e.target.files.length; i++) {
            photos.push(e.target.files[i]);
        }
        this.setState({photos: photos});
    }

    renderForm() {
        const {classes} = this.props;
        switch (this.state.activeStep) {
            case 0:
                return (
                    <div>
                        <ItemForm
                            categories={this.props.categories}
                            onChange={this.onItemOwnedChange}
                            item={this.state.itemOwned}
                            errors={this.state.itemOwnedError}
                        />
                        <Container component="main" maxWidth="sm">
                            <FormControl fullWidth error={Boolean(this.state.itemOwnedError.exchangeLocation)}>
                                <Button
                                    fullWidth
                                    className={!this.state.itemOwnedError.exchangeLocation ? classes.formButton : classes.formButtonError}
                                    endIcon={<LocationOnIcon />}
                                    onClick={this.toggleLocationModal}>
                                    Pick Location *
                                </Button>
                                <FormHelperText>{this.state.itemOwnedError.exchangeLocation}</FormHelperText>
                                {this.state.exchangeLocation.coordinates.length == 2 ? (
                                    <Typography align="center">Location Selected successfully</Typography>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth error={Boolean(this.state.itemOwnedError.photos)}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={this.onImageUpload}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        fullWidth
                                        className={!this.state.itemOwnedError.photos ? classes.formButton : classes.formButtonError}
                                        component="span"
                                        endIcon={<CloudUploadIcon />}>
                                        Upload *
                                    </Button>
                                </label>
                                <FormHelperText>{this.state.itemOwnedError.photos}</FormHelperText>
                                {this.state.photos.map((photo, idx) => (
                                    <Typography key={idx} align="center">
                                        <ImageIcon />
                                        {photo.name}
                                    </Typography>
                                ))}
                            </FormControl>
                        </Container>
                        <LocationModal
                            modalOpen={this.state.locationModalOpen}
                            onClose={this.toggleLocationModal}
                            setLocation={this.setLocation}></LocationModal>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <ItemForm
                            categories={this.props.categories}
                            onChange={this.onItemDesiredChange}
                            item={this.state.itemDesired}
                            errors={this.state.itemDesiredError}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <PostDetails post={this.makePost()} />
                    </div>
                );
        }
    }

    render() {
        const steps = ["Tell us what you have", "Tell us what you want", "Are you sure this is correct?"];
        const {classes} = this.props;
        return (
            <Page>
                <Paper elevation={5} className={classes.root}>
                    <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<ColorlibConnector />} className={classes.root}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {this.renderForm()}
                    <div className={classes.bottom}>
                        <Button disabled={this.state.activeStep == 0} onClick={this.handleBack} className={classes.button}>
                            Back
                        </Button>
                        {this.state.activeStep == steps.length - 1 ? (
                            <Button variant="contained" onClick={this.handleNext} className={classes.button}>
                                Confirm
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={this.handleNext} className={classes.button}>
                                Next
                            </Button>
                        )}
                    </div>
                </Paper>
            </Page>
        );
    }
}

export default withStyles(styles)(PostStepper);
