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

let theme = createMuiTheme({
    palette: {
        type: window.localStorage["dark"] ? "dark" : "light",
        // Headers
        primary: {
            // navbar and all tab/ toolbar related stuff
            light: "#15a4f7",
            main: "#FFFFFF",
            dark: "#2b2b2b",
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#FFFFFF",
            main: "#64B42D",
            dark: "#212121",
            contrastText: "#FFF",
        },
        // for all buttons except error buttons
        button: {
            backgroundColor: () => (theme.palette.type === "dark" ? "#aeaeae" : "#15a4f7"),
            textColor: () => (theme.palette.type === "dark" ? "#2b2b2b" : "#FFFFFF"),
            error: "#a70000",
            // contrastThreshold: 10,
        },
        header: {
            backgroundColor: () => (theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light),
            textColor: () => (theme.palette.type === "dark" ? "#aeaeae" : "#FFFFFF"),
        },
    },

    typography: {
        // Use the system font over Roboto.
        fontFamily: 'Avenir Next, Roboto,"Helvetica Neue",Arial,sans-serif',
        htmlFontSize: 16,
        // color: () => (theme.palette.type === "dark" ? "#2b2b2b" : "#FFFFFF"),
    },
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
