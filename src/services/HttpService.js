"use strict";
import axios from "axios";
export default class HttpService {
  constructor() {}

  static apiURL() {
    return "http://localhost:3000";
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
      let errorMsg;
      if (err.response.data.message) {
        errorMsg = err.response.data.message;
      } else {
        errorMsg = err.message;
      }
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
        body: JSON.stringify(data),
      });
      // set token if present
      if (Object.prototype.hasOwnProperty.call(resp, "token")) {
        window.localStorage["jwtToken"] = resp.token;
      }
      onSuccess(resp);
    } catch (err) {
      // parse error msg from server if present else use the err message
      let errorMsg;
      if (err.response.data.message) {
        errorMsg = err.response.data.message;
      } else {
        errorMsg = err.message;
      }
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
        body: JSON.stringify(data),
      });

      // set token if present
      if (Object.prototype.hasOwnProperty.call(resp, "token")) {
        window.localStorage["jwtToken"] = resp.token;
      }
      onSuccess(resp);
    } catch (err) {
      // parse error msg from server if present else use the err message
      let errorMsg;
      if (err.response.data.message) {
        errorMsg = err.response.data.message;
      } else {
        errorMsg = err.message;
      }
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
      let errorMsg;
      if (err.response.data.message) {
        errorMsg = err.response.data.message;
      } else {
        errorMsg = err.message;
      }
      onError(errorMsg);
    }
  }
}
