"use strict";

import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ReviewListItem from "./ReviewListItem";

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            reviews: PropTypes.array.isRequired,
        };
    }

    render() {
        if (this.props.reviews.length == 0) {
            return (
                <Typography variant="h5" align="center">
                    No reviews available
                </Typography>
            );
        }

        return this.props.reviews.map(review => <ReviewListItem key={review._id} review={review} />);
    }
}

export default ReviewList;
