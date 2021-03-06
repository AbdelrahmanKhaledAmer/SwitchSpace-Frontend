"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Trending from "../components/Trending";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

// Services
import TrendingService from "../services/TrendingService";

export default class TrendingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: true, // when true => loading state
            subcategories: [],
            posts: [],
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"};
        };

        this.getPostsBySubcategory = this.getPostsBySubcategory.bind(this);
        this.populateGraph = this.populateGraph.bind(this);
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async componentDidMount() {
        await this.populateGraph();
        await this.getPostsBySubcategory(this.state.subcategories[0].title);
        this.setState({loading: false});
    }

    async populateGraph() {
        try {
            let response = await TrendingService.getTrendingSubcategories();
            await this.setState({subcategories: response.data.data});
        } catch (err) {
            this.notify(err, "error");
        }
    }

    async getPostsBySubcategory(subcategory) {
        try {
            let response = await TrendingService.getPostsBySubcategory(subcategory);
            this.setState({posts: response.data.data});
        } catch (err) {
            this.notify(err, "error");
        }
    }

    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }

    // Reset notification state must bbe included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }

    render() {
        return (
            <React.Fragment>
                <Loading loading={this.state.loading} />
                <Trending data={this.state.subcategories} posts={this.state.posts} onCategoryClick={this.getPostsBySubcategory}></Trending>
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
