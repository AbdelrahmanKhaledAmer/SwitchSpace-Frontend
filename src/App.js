"use strict";
// React
import React from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
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
import HomePageView from "./views/HomePageView";
import NotFoundView from "./views/NotFoundView";
// Services
import userAuthService from "./services/UserAuthService";
import AdminAuthService from "./services/AdminAuthService";
// Theme
import settings from "./palette";

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
                {
                    // not loggedin
                    render: props => {
                        if (!userAuthService.isAuthenticated()) {
                            // iff not logged in as admin
                            return <AdminLoginView {...props} />;
                        } else {
                            // admin or logged in user
                            if (AdminAuthService.isAdminUser()) return <Redirect to={"/admin/reports"} />;
                            else return <Redirect to={"/"} />;
                        }
                    },
                    exact: true,
                    path: "/admin/auth",
                },
                {
                    // admin only
                    render: props => {
                        if (AdminAuthService.isAdminUser()) {
                            return <AdminView {...props} />;
                        } else if (userAuthService.isNormalUser()) {
                            return <Redirect to={"/"} />;
                        } else {
                            return <Redirect to={"/admin/auth"} />;
                        }
                    },
                    exact: true,
                    path: "/admin/reports",
                },
                {
                    // not loggedin
                    render: props => {
                        if (!userAuthService.isAuthenticated()) {
                            return <UserLoginView {...props} />;
                        } else {
                            return <Redirect to="/" />;
                        }
                    },
                    // component: UserLoginView,
                    exact: true,
                    path: "/login",
                },

                {
                    // not loggedin
                    render: props => {
                        if (!userAuthService.isAuthenticated()) {
                            return <UserSignupView {...props} />;
                        } else {
                            return <Redirect to="/" />;
                        }
                    },
                    exact: true,
                    path: "/signup",
                },
                {component: SearchFilterView, exact: true, path: "/search"},
                {component: TrendingView, exact: true, path: "/trending"},
                {component: PostView, exact: true, path: "/post/:id"},
                {component: UserProfileView, exact: true, path: "/profile/:id"},
                {
                    // normal user only
                    render: props => {
                        if (userAuthService.isNormalUser()) {
                            return <SubscriptionsView {...props} />;
                        } else if (AdminAuthService.isAdminUser()) {
                            return <AdminView {...props} />;
                        } else {
                            return <Redirect to="/login" />;
                        }
                    },
                    exact: true,
                    path: "/subscriptions",
                },
                {
                    // normal user only
                    render: props => {
                        if (userAuthService.isNormalUser()) {
                            return <PostCreateView {...props} />;
                        } else if (AdminAuthService.isAdminUser()) {
                            return <AdminView {...props} />;
                        } else {
                            return <Redirect to="/login" />;
                        }
                    },
                    exact: true,
                    path: "/create",
                },
                {component: HomePageView, exact: true, path: "/"},
                {component: NotFoundView},
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
