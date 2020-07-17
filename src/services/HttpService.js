"use strict";
import axios from "axios";
export default class HttpService {
    constructor() {}

    static apiURL() {
        return process.env.REACT_APP_SERVER_URL;
    }
    static handleError(err) {
        let errorMsg = err.message;
        if (err.response && err.response.data.message) {
            errorMsg = err.response.data.message;
        }
        return errorMsg;
    }
    // check if user unauthorized
    static checkIfUnauthorized(err) {
        // do nothing if no response
        if (err.response && err.response.status === 401) {
            return true;
        }
        return false;
    }

    // Get request
    static async get(url, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        let header = {};
        header["Content-Type"] = "application/json";
        if (token) {
            header.Authorization = `Bearer ${token}`;
        }
        // append full URL
        url = this.apiURL() + url;
        try {
            let resp = await axios(url, {
                method: "GET",
                headers: header,
            });

            // set token if present
            if (resp.data && resp.data.token) {
                window.localStorage["jwtToken"] = resp.data.token;
            }
            onSuccess(resp);
        } catch (err) {
            // parse error msg from server if present else use the err message
            if (this.checkIfUnauthorized(err)) {
                window.localStorage.removeItem("jwtToken");
                // window.location = "/#login";
            }
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
    // Put request
    static async put(url, data, headers, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        if (!headers) {
            headers = {};
            headers["Content-Type"] = "application/json";
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        // append full URL
        url = this.apiURL() + url;

        try {
            let resp = await axios(url, {
                method: "PUT",
                headers: headers,
                data: data,
            });
            // set token if present
            if (resp.data && resp.data.token) {
                window.localStorage["jwtToken"] = resp.data.token;
            }
            onSuccess(resp);
        } catch (err) {
            if (this.checkIfUnauthorized(err)) {
                window.localStorage.removeItem("jwtToken");
                // window.location = "/#login";
            }
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
    // Post request
    static async post(url, data, headers, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        if (!headers) {
            headers = {};
            headers["Content-Type"] = "application/json";
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        // append full URL
        url = this.apiURL() + url;
        try {
            let resp = await axios(url, {
                method: "POST",
                headers: headers,
                data: data,
            });

            // set token if present
            if (resp.data && resp.data.token) {
                window.localStorage["jwtToken"] = resp.data.token;
            }
            onSuccess(resp);
        } catch (err) {
            if (this.checkIfUnauthorized(err)) {
                window.localStorage.removeItem("jwtToken");
                // window.location = "/#login";
            }
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
    // Delete request
    static async delete(url, onSuccess, onError) {
        let token = window.localStorage["jwtToken"];
        let header = {};
        header["Content-Type"] = "application/json";
        if (token) {
            header.Authorization = `Bearer ${token}`;
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
            if (this.checkIfUnauthorized(err)) {
                window.localStorage.removeItem("jwtToken");
                // window.location = "/#login";
            }
            // parse error msg from server if present else use the err message
            const errorMsg = HttpService.handleError(err);
            onError(errorMsg);
        }
    }
}
