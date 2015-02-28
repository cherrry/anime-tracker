"use strict";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
        case "download":
            onDownload(request, sendResponse);
        break;
    }
});

function onDownload(request, sendResponse) {
    sendResponse({
        type: "download",
        status: "accept",
        message: request.magnet
    });
}
