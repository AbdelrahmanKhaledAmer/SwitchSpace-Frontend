"use strict";

// colors choosen for the website
const color = {
    primaryLight: "#15a4f7",
    primaryLightHover: "#15c4ff",
    secondaryLight: "#FFFFFF",
    primaryDark: "#2b2b2b",
    secondaryDark: "#212121",
    terDark: "#7e7e7e",
    terDarkHover: "#aeaeae",
    error: "#a70000",
};

const preference = window.localStorage["dark"] ? "dark" : "light";

// choices for different color variants
//here define functions for light and dark
const mainPrimaryColor = () => (preference === "dark" ? color.terDark : color.primaryLight);
const mainSecondaryColor = () => (preference === "dark" ? color.terDark : color.primaryLight);

const palette = {
    type: preference,
    // Headers
    primary: {
        // navbar and all tab/ toolbar related stuff
        light: color.primaryLight,
        main: mainPrimaryColor(),
        dark: color.primaryDark,
        // contrastText: "#ffffff",
    },
    secondary: {
        light: color.secondaryLight,
        main: mainSecondaryColor(),
        dark: color.secondaryDark,
        // contrastText: "#FFF",
    },
    // for all buttons except error buttons
    button: {
        backgroundColor: () => (preference === "dark" ? color.terDark : color.primaryLight),
        textColor: () => (preference === "dark" ? color.secondaryDark : color.secondaryLight),
        error: color.error,
        hover: {
            backgroundColor: () => (preference === "dark" ? color.terDarkHover : color.primaryLightHover),
        },
        // contrastThreshold: 10,
    },
    // for all headers and titles
    header: {
        backgroundColor: () => (preference === "dark" ? color.primaryDark : color.primaryLight),
        textColor: () => (preference === "dark" ? color.terDark : color.secondaryLight),
    },
    contrastObject: {
        backgroundColor: color.terDarkHover,
    },
};

const typography = {
    // Use the system font over Roboto.
    fontFamily: 'Avenir Next, Roboto,"Helvetica Neue",Arial,sans-serif',
    htmlFontSize: 16,
};

export default {font: typography, colors: palette};
