"use strict";

// anime-update listener
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type !== "anime-update") {
        return false;
    }

    chrome.notifications.create("anime-update:" + message.anime, {
        type: "basic",
        iconUrl: "/images/pokemon-xy.png",
        title: message.anime,
        message: message.anime + " is updated!"
    }, function () {});

    return true;
});
