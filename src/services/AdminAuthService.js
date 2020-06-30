"use strict";
import HttpService from "./HttpService";
export default class AdminAuthService {
    constructor() {}
    static baseURL() {
        return "/admin/auth";
    }
    // takes email and password  and make a login request
    static login(admin) {
        console.log(admin);
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${AdminAuthService.baseURL()}/login`,
                admin,
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
}
