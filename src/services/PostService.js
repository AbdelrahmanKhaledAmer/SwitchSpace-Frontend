"use strict";

import HttpService from "./HttpService";

export default class PostService {
    constructor() {}

    static baseURL() {
        return "/post";
    }

    static createPost(postData) {
        let headers = {
            "Content-Type": "multipart/form-data",
        };
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${PostService.baseURL()}/`,
                postData,
                headers,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static editPost(postData, postId) {
        let headers = {
            "Content-Type": "multipart/form-data",
        };

        return new Promise((resolve, reject) => {
            HttpService.put(
                `${PostService.baseURL()}/${postId}`,
                postData,
                headers,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getPost(postId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${PostService.baseURL()}/${postId}`,
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

    static deletePost(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${PostService.baseURL()}/${id}`,
                id,
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

    static getSearchPosts(searchQueryBody) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${PostService.baseURL()}/search?iw=${searchQueryBody.itemWanted}&io=${searchQueryBody.itemOwned}&iwCat=${
                    searchQueryBody.wantedCategory
                }&iwSubcat=${searchQueryBody.wantedSubcategory}&ioCat=${searchQueryBody.ownedCategory}&ioSubcat=${
                    searchQueryBody.ownedSubcategory
                }&iwCon=${searchQueryBody.wantedCondition}&ioCon=${searchQueryBody.ownedCondition}&lng=${searchQueryBody.lng}&lat=${
                    searchQueryBody.lat
                }&radius=${searchQueryBody.radius}`,
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
