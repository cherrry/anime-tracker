"use strict";

var Ajax = {
    Get: _Get,
    GetBinary: _GetBinary,
    Post: _Post
};

function _EmptyCallback() {}

function _AjaxRequest (config) {
    var method = config.method || "GET";
    var url = config.url;
    var contentType = config.contentType || null;
    var successCallback = config.success || _EmptyCallback;
    var errorCallback = config.error || _EmptyCallback;
    var data = config.data || {};
    var responseType = config.responseType || null;

    var request = new XMLHttpRequest();

    request.open(method, url, true);
    if (contentType !== null) {
        request.setRequestHeader('Content-Type', contentType);
    }
    if (responseType !== null) {
        request.responseType = responseType;
    }

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            successCallback(request.response);
        } else {
            errorCallback();
        }
    };
    request.onerror = errorCallback;

    request.send(data);
}

function _Get (url, success, error) {
    var config = {
        method: "GET",
        url: url,
        success: success,
        error: error,
    };
    _AjaxRequest(config);
}

function _GetBinary (url, success, error) {
    var config = {
        method: "GET",
        url: url,
        success: success,
        error: error,
        responseType: "arraybuffer"
    };
    _AjaxRequest(config);
}

function _Post (url, data, success, error) {
    var config = {
        method: "POST",
        url: url,
        data: data,
        success: success,
        error: error
    };
    _AjaxRequest(config);
}

module.exports = Ajax;
