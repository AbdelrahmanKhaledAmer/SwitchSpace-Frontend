"use strict";
import userAuthService from "./UserAuthService";
import HttpService from "./HttpService";
export default class AdminAuthService {
    constructor() {}
    static baseURL() {
        return "/admin/auth";
    }
    // takes email and password  and make a login request
    static login(admin) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${AdminAuthService.baseURL()}/login`,
                admin,
                null,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static isAdminUser() {
        return userAuthService.isAuthenticated() && !userAuthService.isNormalUser();
    }

    static logout() {
        window.localStorage.removeItem("jwtToken");
    }
}
