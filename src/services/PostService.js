"use strict";

import HttpService from "./HttpService";

export default class PostService {
    constructor() {}

    static baseURL() {
        return "/post";
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
    static getSearchPosts(itemWanted, itemOwned, itemWantedCategory, itemOwnedCategory, lon, lat, raduis) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${PostService.baseURL()}
                /search?iw=${itemWanted}&io=${itemOwned}&iwCat=${itemWantedCategory}&ioCat=
                ${itemOwnedCategory}&lon=${lon}&lat=${lat}&raduis=${raduis}`,
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
