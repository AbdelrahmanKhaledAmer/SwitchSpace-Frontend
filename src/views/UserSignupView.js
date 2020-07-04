"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import CircularProgress from "@material-ui/core/CircularProgress";
// Components
import UserSignup from "../components/UserAuth/UserSignup";
// Services
import UserAuthService from "../services/UserAuthService";

export default class UserSignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.renderLoading = this.renderLoading.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
    }

    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async signup(user) {
        this.setState({loading: true});

        const data = new FormData();
        for (let key in user) {
            data.append(key, user[key]);
        }

        try {
            await UserAuthService.register(data);
            // TODO: redirects

            this.setState({loading: false});
            this.props.history.push("/");
        } catch (err) {
            // TODO: send notification message
            console.error(err);
            this.setState({loading: false});
        }
    }

    renderLoading() {
        return (
            <div>
                <CircularProgress />
                <CircularProgress color="secondary" />
            </div>
        );
    }

    renderComponent() {
        return <UserSignup onSubmit={user => this.signup(user)}></UserSignup>;
    }

    render() {
        return <div>{this.state.loading ? this.renderLoading() : this.renderComponent()}</div>;
    }
}
