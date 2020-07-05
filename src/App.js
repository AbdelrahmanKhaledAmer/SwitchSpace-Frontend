"use strict";
// React
import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
// Material UI Core
import {responsiveFontSizes, createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// Views
import UserLoginView from "./views/UserLoginView";
import UserSignupView from "./views/UserSignupView";
import TrendingView from "./views/TrendingView";
import PostView from "./views/PostView";
import SubscriptionsView from "./views/SubscriptonsView";
import SearchFilterView from "./views/SearchFilterView";
import AdminLoginView from "./views/AdminLoginView";
import AdminView from "./views/AdminView";
import PostCreateView from "./views/PostCreateView";
import UserProfileView from "./views/UserProfileView";
// Theme
import settings from "./pallete";

// import theme from file
let theme = createMuiTheme({
    palette: settings.colors,
    typography: settings.font,
});
theme = responsiveFontSizes(theme);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Switch Space",
            theme: null,
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
                {component: PostView, path: "/post/:id"},
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
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <Router>
                        <Switch>
                            {this.state.routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Switch>
                    </Router>
                </CssBaseline>
            </ThemeProvider>
        );
    }
}
