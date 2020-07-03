"use strict";
import HttpService from "./HttpService";

export default class ReviewService {
    constructor() {}
    static baseURL() {
        return "/review";
    }

    static reviewUser(review) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${ReviewService.baseURL()}/`,
                review,
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
}
