"use strict";

import HttpService from "./HttpService";

export default class UserAuthService {
  constructor() {}

  static baseURL() {
    return "/user/auth";
  }

  // takes a full user object
  static register(user) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserAuthService.baseURL()}/register`,
        user,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // takes email and password  and make a login request
  static login(email, password) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserAuthService.baseURL()}/login`,
        { email: email, password: password },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem("jwtToken");
  }

  static getCurrentUser() {
    let token = window.localStorage["jwtToken"];
    if (!token) return {};

    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    return {
      id: JSON.parse(window.atob(base64)).id,
      username: JSON.parse(window.atob(base64)).username,
    };
  }

  static isAuthenticated() {
    return !!window.localStorage["jwtToken"];
  }
}
