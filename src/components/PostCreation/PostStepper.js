import React from "react";
import PropTypes from "prop-types";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import Container from "@material-ui/core/Container";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
// import FileInput from "@brainhubeu/react-file-input";
import Page from "../Page";
import ItemForm from "./ItemForm";
import LocationModal from "./LocationModal";

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

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        "& $line": {
            backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    completed: {
        "& $line": {
            backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
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
        backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
        backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    },
});

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
        marginTop: theme.spacing(7),
        margin: "0 auto",
        paddingBottom: theme.spacing(2),
        borderRadius: "10px",
    },
    button: {
        backgroundColor: "#659dbd",
        color: "#fbeec1",
        margin: theme.spacing(0, 1),
    },
    locationButton: {
        backgroundColor: "#659dbd",
        color: "#fbeec1",
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    bottom: {
        textAlign: "center",
    },
    fileInputContainer: {
        width: "100%",
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        border: "1px solid grey",
        borderRadius: "5px",
    },
    // ".brainhub-file-input__label": {
    //     fontSize: "14px",
    //     lineHeight: "18px",
    //     color: "#808080",
    //     marginBottom: "4px",
    // },
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
                coordinates: null,
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
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            categories: PropTypes.array.isRequired,
        };
    }

    handleNext() {
        if (this.state.activeStep == 2) {
            // TODO: REDIRECT
        } else {
            this.setState({
                activeStep: this.state.activeStep + 1,
            });
        }
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

    renderForm() {
        const {classes} = this.props;
        console.log(this.state);
        switch (this.state.activeStep) {
            case 0:
                return (
                    <div>
                        <ItemForm categories={this.props.categories} onChange={this.onItemOwnedChange} item={this.state.itemOwned} />
                        <Container component="main" maxWidth="sm">
                            <br />
                            <Button fullWidth className={classes.locationButton} onClick={this.toggleLocationModal}>
                                Pick Location *
                            </Button>
                            {/* <div className={classes.fileInputContainer}>
                                <FileInput label="Pictures" />
                            </div> */}
                            <br />
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
                        <ItemForm categories={this.props.categories} onChange={this.onItemDesiredChange} item={this.state.itemDesired} />
                    </div>
                );
            case 3:
                return <div>POST DETAILS</div>; // TODO: POST DETAILS
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
                                {/*TODO: FORMS AND DETAIL VIEW*/}
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
