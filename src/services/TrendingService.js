"use strict";

import HttpService from "./HttpService";

export default class TrendingService {
    constructor() {}

    static baseURL() {
        return "/trending";
    }

    static getTrendingSubcategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${TrendingService.baseURL()}/subcategories`,
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
                `${TrendingService.baseURL()}/posts?cat=` + subcategory,
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
