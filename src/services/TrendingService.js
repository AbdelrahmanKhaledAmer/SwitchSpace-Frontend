"use strict";

import HttpService from "./HttpService";

export default class UserAuthService {
    constructor() {}

    static baseURL() {
        return "/trending";
    }

    // takes a full user object
    static getTrendingSubcategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserAuthService.baseURL()}/subcategories`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getPostsBySubcategory(subcategory) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserAuthService.baseURL()}/posts?cat=` + subcategory,
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
