"use strict";

import HttpService from "./HttpService";

export default class CategoryService {
    constructor() {}

    static baseURL() {
        return "/category";
    }

    // takes a full user object
    static getSubcategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${CategoryService.baseURL()}/subcategories`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getCategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${CategoryService.baseURL()}/`,
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
