"use strict";
import HttpService from "./HttpService";

export default class UserService {
    constructor() {}
    static baseURL() {
        return "/profile";
    }

    static changeSubscriptionTier(changeRequest) {
        console.log(changeRequest);
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${UserService.baseURL()}/subscription`,
                changeRequest,
                function (data) {
                    //resolve
                    resolve(data);
                },
                function (textStatus) {
                    //reject
                    reject(textStatus);
                }
            );
        });
    }

    static getUserInfo(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/user/${userId}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}
