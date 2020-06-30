"use strict";

import React from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    // Redirect,
} from "react-router-dom";

import UserLoginView from "./views/UserLoginView";
import UserSignupView from "./views/UserSignupView";
import TrendingView from "./views/TrendingView";
// import PostView from "./views/PostView";
import SubscriptionsView from "./views/SubscriptonsView";
import SearchFilterView from "./views/SearchFilterView";
import AdminLoginView from "./views/AdminLoginView";
import AdminView from "./views/AdminView";
import PostCreateView from "./views/PostCreateView";
import UserProfileView from "./views/UserProfileView";
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Switch Space",
            routes: [
                {component: AdminLoginView, path: "/admin/auth"},
                // TODO: check loggedin Admin
                {component: AdminView, path: "/admin/reports"},
                // TODO: check not loggedin
                {component: UserLoginView, path: "/login"},
                // TODO: check not loggedin
                {component: UserSignupView, path: "/register"},
                {component: SearchFilterView, path: "/search"},
                {component: TrendingView, path: "/trending"},
                // TODO: check loggedin
                // {component: PostView, path: "/post"},
                {component: UserProfileView, path: "/profile/:id"},
                // TODO: check loggedin
                {component: SubscriptionsView, path: "/charge"},
                // TODO: check loggedin
                {component: PostCreateView, path: "/create"},
            ],
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (
                            <Route key={i} {...route} />
                        ))}
                    </Switch>
                </Router>
            </div>
        );
    }
}
