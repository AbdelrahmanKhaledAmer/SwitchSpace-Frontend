"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    itemTitle: {
        fontWeight: "bold",
        fontSize: "1.75em",
    },
    boldText: {
        fontWeight: "bold",
        marginRight: theme.spacing(1),
    },
    chip: {
        marginRight: theme.spacing(1),
    },
});

class Item extends React.Component {
    constructor(props) {
        super(props);

        let array = [];
        for (let i = 1990; i < 2022; i++) {
            array.push(i);
        }

        let chosenCategory = null;
        if (this.props.item.category) {
            chosenCategory = this.props.categories.filter(elem => elem.title == this.props.item.category)[0];
        }

        this.state = {
            editMode: false,
            yearArray: array,
            editedItem: JSON.parse(JSON.stringify(this.props.item)),
            chosenCategory: chosenCategory,
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.shouldRenderSubcategories = this.shouldRenderSubcategories.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubategoryChange = this.handleSubategoryChange.bind(this);
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleModelYearChange = this.handleModelYearChange.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            item: PropTypes.object.isRequired,
            categories: PropTypes.array.isRequired,
            isOwnPost: PropTypes.bool,
            onChange: PropTypes.func,
        };
    }

    toggleEdit() {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    shouldRenderSubcategories() {
        return this.state.chosenCategory != null && this.state.chosenCategory.title != "other";
    }

    async handleCategoryChange(e) {
        let chosenCategory = this.props.categories.filter(category => category.title == e.target.value)[0];
        let item;
        if (chosenCategory.title == "other") {
            item = {
                ...this.state.editedItem,
                category: chosenCategory.title,
                subcategory: "",
            };
            this.setState({
                chosenCategory: chosenCategory,
            });
        } else {
            item = {
                ...this.state.editedItem,
                category: chosenCategory.title,
            };
            await this.setState({
                chosenCategory: chosenCategory,
            });
        }
        this.setState({editedItem: item});
        this.props.onChange(item);
    }

    handleSubategoryChange(e) {
        let item = {
            ...this.state.editedItem,
            subcategory: e.target.value,
        };
        this.setState({editedItem: item});
        this.props.onChange(item);
    }

    handleConditionChange(e) {
        let item = {
            ...this.state.editedItem,
            condition: e.target.value,
        };
        this.setState({editedItem: item});
        this.props.onChange(item);
    }

    handleModelYearChange(e) {
        let item = {
            ...this.state.editedItem,
            modelYear: e.target.value,
        };
        this.setState({editedItem: item});
        this.props.onChange(item);
    }

    handleNameChange(e) {
        let item = {
            ...this.state.editedItem,
            title: e.target.value,
        };
        this.setState({editedItem: item});
        this.props.onChange(item);
    }

    handleDescriptionChange(e) {
        let item = {
            ...this.state.editedItem,
            description: e.target.value,
        };
        this.setState({editedItem: item});
        this.props.onChange(item);
    }

    renderEditMode() {
        return (
            <React.Fragment>
                <ListItem>
                    <Select autoWidth value={this.state.editedItem.category} onChange={this.handleCategoryChange}>
                        {this.props.categories.map((category, idx) => (
                            <MenuItem key={idx} value={category.title}>
                                {category.title}
                            </MenuItem>
                        ))}
                    </Select>
                    {this.shouldRenderSubcategories() ? (
                        <Select autoWidth value={this.state.editedItem.subcategory} onChange={this.handleSubategoryChange}>
                            {this.state.chosenCategory.subcategories.map((subcategory, idx) => (
                                <MenuItem key={idx} value={subcategory.title}>
                                    {subcategory.title}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <React.Fragment />
                    )}
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={this.toggleEdit}>
                            <CancelIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <TextField value={this.state.editedItem.title} onChange={this.handleNameChange} />
                </ListItem>
                <ListItem dense>
                    <Select autoWidth value={this.state.editedItem.condition} onChange={this.handleConditionChange}>
                        <MenuItem value={"New"}>New</MenuItem>
                        <MenuItem value={"Used"}>Used</MenuItem>
                    </Select>
                </ListItem>
                <ListItem dense>
                    <Select autoWidth value={this.state.editedItem.modelYear} onChange={this.handleModelYearChange}>
                        {this.state.yearArray.map((year, idx) => (
                            <MenuItem key={idx} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </ListItem>
                <ListItem dense>
                    <TextField
                        value={this.state.editedItem.description}
                        fullWidth
                        multiline
                        rows={3}
                        rowsMax={3}
                        id="description"
                        label="Description"
                        onChange={this.handleDescriptionChange}
                    />
                </ListItem>
            </React.Fragment>
        );
    }

    render() {
        const {classes} = this.props;
        if (this.state.editMode) {
            return this.renderEditMode();
        }
        return (
            <React.Fragment>
                <ListItem dense>
                    <Chip label={this.props.item.category} size="small" className={classes.chip} />
                    <Chip label={this.props.item.subcategory} size="small" className={classes.chip} />
                    {this.props.isOwnPost ? (
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={this.toggleEdit}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    ) : (
                        <React.Fragment />
                    )}
                </ListItem>
                <ListItem>
                    <div className={classes.itemTitle}>{this.props.item.title}</div>
                </ListItem>
                <ListItem dense>
                    <div className={classes.boldText}>Condition: </div> {this.props.item.condition}
                </ListItem>
                <ListItem dense>
                    <div className={classes.boldText}>Model year:</div>
                    {this.props.item.modelYear ? this.props.item.modelYear : <Typography color="textSecondary">{"N/A"}</Typography>}
                </ListItem>
                <ListItem dense>
                    <div className={classes.boldText}>Description: </div>
                </ListItem>
                <ListItem dense>{this.props.item.description ? this.props.item.description : "No description provided."}</ListItem>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Item);
