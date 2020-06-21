"use strict";
import axios from "axios";
export default class HttpService {
    constructor() {}

    static apiURL() {
        return "http://localhost:3000";
    }
    static handleError(err) {
        let errorMsg = err.message;
        if (err.response && err.response.data.message) {
            errorMsg = err.response.data.message;
        }
        return errorMsg;
    }

    // Get request
    static async get(url, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        let header = new Headers();
        if (token) {
            header.append("Authorization", `JWT ${token}`);
        }
        // append full URL
        url = this.apiURL() + url;
        try {
            let resp = await axios(url, {
                method: "GET",
                headers: header,
            });

            resp = await resp.json();

            // save token in local storage if exists
            if (Object.prototype.hasOwnProperty.call(resp, "token")) {
                window.localStorage["jwtToken"] = resp.token;
            }
            onSuccess(resp);
        } catch (err) {
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
    // Put request
    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        let header = new Headers();
        if (token) {
            header.append("Authorization", `JWT ${token}`);
        }
        header.append("Content-Type", "application/json");
        // append full URL
        url = this.apiURL() + url;

        try {
            let resp = await axios(url, {
                method: "PUT",
                headers: header,
                data: data,
            });
            // set token if present
            if (Object.prototype.hasOwnProperty.call(resp, "token")) {
                window.localStorage["jwtToken"] = resp.token;
            }
            onSuccess(resp);
        } catch (err) {
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
    // Post request
    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        let header = new Headers();
        if (token) {
            header.append("Authorization", `JWT ${token}`);
        }
        header.append("Content-Type", "application/json");
        // append full URL
        url = this.apiURL() + url;
        try {
            let resp = await axios(url, {
                method: "POST",
                headers: header,
                data: data,
            });

            // set token if present
            if (Object.prototype.hasOwnProperty.call(resp, "token")) {
                window.localStorage["jwtToken"] = resp.token;
            }
            onSuccess(resp);
        } catch (err) {
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
    // Delete request
    static async remove(url, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        let header = new Headers();
        if (token) {
            header.append("Authorization", `JWT ${token}`);
        }
        // append full URL
        url = this.apiURL() + url;
        try {
            let resp = await axios(url, {
                method: "DELETE",
                headers: header,
            });
            onSuccess(resp);
        } catch (err) {
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
}
