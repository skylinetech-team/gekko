const request = require('request');

const baseUrl = "https://svc.apps-skylinetech.com/"

const headers = {
    "content-type": "application/json",
    "x-ios-bundle-identifier": "com.skylinetech.apps.common"
}

exports.signup = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/auth/v1/emailauth?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });

    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body.profile
    };
}

exports.getUser = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/auth/v1/emailauth?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });
    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body.profile
    };
}

exports.register = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/setup/v1/register?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });
    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body
    };
}

exports.saveprofile = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/setup/v1/saveprofile?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });
    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body
    };
}

exports.resetpassword = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/auth/v1/resetpassword?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });
    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body
    };
}

exports.verification = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/setup/v1/verification?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });
    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body
    };
}

exports.validate = function* () {
    const ctx = this
    const requestData = ctx.request.body
    const body = yield new Promise((resolve) => {
        request({
            url: baseUrl + "api/setup/v1/validate?key=AIzaSyBY5w28UY9nSVulwXjfqU7cdoBJkBi7SUw",
            method: "POST",
            json: true,
            headers: headers,
            body: requestData
        }, (error, response, body) => {
            resolve(body)
        });
    });
    ctx.body = {
        success: body.statusCode == 200,
        code: body.statusCode,
        result: body
    };
}

