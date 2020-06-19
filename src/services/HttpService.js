"use strict";

export default class HttpService {
  constructor() {}

  static apiURL() {
    return "http://localhost:3000";
  }

  static async get(url, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    // append full URL
    url = this.apiURL() + url;
    try {
      let resp = await fetch(url, {
        method: "GET",
        headers: header,
      });

      resp = await resp.json();

      if (resp.error) {
        onError(resp.error);
      } else {
        // save token in local storage if exists
        if (Object.prototype.hasOwnProperty.call(resp, "token")) {
          window.localStorage["jwtToken"] = resp.token;
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

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
      let resp = await fetch(url, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      resp = await resp.json();

      if (resp.error) {
        onError(resp.error);
      } else {
        if (Object.prototype.hasOwnProperty.call(resp, "token")) {
          window.localStorage["jwtToken"] = resp.token;
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

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
      let resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
      });

      resp = await resp.json();

      if (resp.error) {
        onError(resp.error);
      } else {
        if (Object.prototype.hasOwnProperty.call(resp, "token")) {
          window.localStorage["jwtToken"] = resp.token;
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async remove(url, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    // append full URL
    url = this.apiURL() + url;
    try {
      let resp = await fetch(url, {
        method: "DELETE",
        headers: header,
      });

      resp = await resp.json();

      if (resp.error) {
        onError(resp.error);
      } else {
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }
}
