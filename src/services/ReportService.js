"use strict";

import HttpService from "./HttpService";

export default class ReportService {
    constructor() {}

    static baseURL() {
        return "/report";
    }
    static createReport(ReportData) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${ReportService.baseURL()}/write`,
                ReportData,
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
