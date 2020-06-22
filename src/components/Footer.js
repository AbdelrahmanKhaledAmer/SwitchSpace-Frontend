"use strict";

import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    footer: {
        maxHeight: "35px",
        bottom: "0",
        left: "0",
        right: "0",
        position: "fixed",
        background: "white",
        textAlign: "center",
    },
});

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <hr />
            <p>© {new Date().getFullYear()} SwitchSpace. All rights reserved.</p>
        </div>
    );
}
