// router.get("/report", logger, middlewares.checkAuthentication, reportController.viewAllReports);
// router.delete("/report", logger, middlewares.checkAuthentication, reportController.deleteReport);
// router.delete("/post", logger, middlewares.checkAuthentication, postController.remove);
"use strict";
import HttpService from "./HttpService";

export default class AdminService {
    constructor() {}
    static baseURL() {
        return "/moderate/";
    }

    static getReports() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${AdminService.baseURL()}report`,
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

    static deleteReport(reportId) {
        return new Promise((resolve, reject) => {
            HttpService.delete(
                `${AdminService.baseURL()}report/${reportId}`,
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
    static deletePost(id) {
        return new Promise((resolve, reject) => {
            HttpService.delete(
                `${AdminService.baseURL()}post/${id}`,
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
}
