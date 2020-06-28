"use strict";

import HttpService from "./HttpService";

export default class PostService {
    constructor() {}

    static baseURL() {
        return "/post";
    }

    static createPost(postData) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${PostService.baseURL()}/`,
                postData,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getUserPosts(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${PostService.baseURL()}?userId=${userId}`,
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
