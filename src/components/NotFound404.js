"use strict";
// React
import React from "react";

// Components
import Page from "./Page";

//source image
import pageNotFound from "../../public/assets/general/404.png";

class NotFound404 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Page>
                <div>
                    <img src={pageNotFound} />
                    <p style={{textAlign: "center"}}></p>
                </div>
                ;
            </Page>
        );
    }
}
export default NotFound404;
