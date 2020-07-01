"use strict";

import React from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

const styles = {
    formControl: {
        margin: 0,
        fullWidth: true,
        display: "flex",
        wrap: "nowrap",
    },
};

class ItemForm extends React.Component {
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
            chosenCategory: chosenCategory,
            yearArray: array,
        };

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.shouldRenderSubcategories = this.shouldRenderSubcategories.bind(this);
        this.handleSubategoryChange = this.handleSubategoryChange.bind(this);
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleModelYearChange = this.handleModelYearChange.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            categories: PropTypes.array.isRequired,
            item: PropTypes.object.isRequired,
            errors: PropTypes.object.isRequired,
            onChange: PropTypes.func.isRequired,
        };
    }

    async handleCategoryChange(e) {
        let chosenCategory = this.props.categories.filter(category => category.title == e.target.value)[0];
        let item;
        if (chosenCategory.title == "other") {
            item = {
                ...this.props.item,
                category: chosenCategory.title,
                subcategory: "",
            };
            this.setState({
                chosenCategory: chosenCategory,
            });
        } else {
            item = {
                ...this.props.item,
                category: chosenCategory.title,
            };
            await this.setState({
                chosenCategory: chosenCategory,
            });
        }
        this.props.onChange(item);
    }

    handleSubategoryChange(e) {
        let item = {
            ...this.props.item,
            subcategory: e.target.value,
        };
        this.props.onChange(item);
    }

    handleConditionChange(e) {
        let item = {
            ...this.props.item,
            condition: e.target.value,
        };
        this.props.onChange(item);
    }

    handleModelYearChange(e) {
        let item = {
            ...this.props.item,
            modelYear: e.target.value,
        };
        this.props.onChange(item);
    }

    handleNameChange(e) {
        let item = {
            ...this.props.item,
            title: e.target.value,
        };
        this.props.onChange(item);
    }

    handleDescriptionChange(e) {
        let item = {
            ...this.props.item,
            description: e.target.value,
        };
        this.props.onChange(item);
    }

    shouldRenderSubcategories() {
        return this.state.chosenCategory != null && this.state.chosenCategory.title != "other";
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="sm">
                <TextField
                    required
                    value={this.props.item.title}
                    fullWidth
                    id="itemName"
                    label="Item Name"
                    autoFocus
                    onChange={this.handleNameChange}
                    error={Boolean(this.props.errors.title)}
                    helperText={this.props.errors.title}
                />
                <FormControl className={classes.formControl} error={Boolean(this.props.errors.condition)}>
                    <InputLabel>Condition *</InputLabel>
                    <Select autoWidth value={this.props.item.condition} onChange={this.handleConditionChange}>
                        <MenuItem value={"New"}>New</MenuItem>
                        <MenuItem value={"Used"}>Used</MenuItem>
                    </Select>
                    <FormHelperText>{this.props.errors.condition}</FormHelperText>
                </FormControl>
                <TextField
                    value={this.props.item.description}
                    fullWidth
                    multiline
                    rows={3}
                    rowsMax={3}
                    id="description"
                    label="Description"
                    onChange={this.handleDescriptionChange}
                />
                <FormControl className={classes.formControl} error={Boolean(this.props.errors.category)}>
                    <InputLabel>Category *</InputLabel>
                    <Select autoWidth value={this.props.item.category} onChange={this.handleCategoryChange}>
                        {this.props.categories.map((category, idx) => (
                            <MenuItem key={idx} value={category.title}>
                                {category.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{this.props.errors.category}</FormHelperText>
                </FormControl>
                {this.shouldRenderSubcategories() ? (
                    <FormControl className={classes.formControl} error={Boolean(this.props.errors.subcategory)}>
                        <InputLabel>Subcategory</InputLabel>
                        <Select autoWidth value={this.props.item.subcategory} onChange={this.handleSubategoryChange}>
                            {this.state.chosenCategory.subcategories.map((subcategory, idx) => (
                                <MenuItem key={idx} value={subcategory.title}>
                                    {subcategory.title}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{this.props.errors.subcategory}</FormHelperText>
                    </FormControl>
                ) : null}
                <FormControl className={classes.formControl}>
                    <InputLabel>Model Year</InputLabel>
                    <Select autoWidth value={this.props.item.modelYear} onChange={this.handleModelYearChange}>
                        {this.state.yearArray.map((year, idx) => (
                            <MenuItem key={idx} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Container>
        );
    }
}

export default withStyles(styles)(ItemForm);
