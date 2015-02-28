"use strict";

var Q = require("q");

var sources = require("./tracker/sources.js");
var Tracker = require("./tracker.js");

var Animes = {};

chrome.runtime.onMessage.addListener(onAnimeInit);

function onAnimeInit(message) {
    var anime = message.anime;

    if (message.type !== "anime-init:request" || !sources.hasOwnProperty(anime)) {
        return;
    }

    Tracker.Retrieve(anime)
        .then(function (episodes) {
            console.log("init response", anime, episodes);
            chrome.runtime.sendMessage({
                type: "anime-init:response",
                anime: anime,
                episodes: episodes
            });
        }).done();
}

function Update() {

    Tracker.Retrieve("Pokemon XY")
        .then(function (episodes) {
            var latestEpisode = episodes.length > 0 ? episodes[0] : null;

            var latestPublish = {};
            latestPublish["Pokemon XY"] = 0;

            chrome.storage.local.get({
                latestPublish: latestPublish
            }, function (storage) {
                var storedPublishTime = storage.latestPublish["Pokemon XY"];
                var latestPublishTime = latestEpisode.publish;

                console.log("stored publish time", storedPublishTime);
                console.log("latest publish time", latestPublishTime);

                if (latestPublishTime > storedPublishTime) {
                    // notify dashboard to update
                    chrome.runtime.sendMessage({
                        type: "anime-update",
                        anime: "Pokemon XY",
                        episodes: episodes,
                        publish: latestPublishTime
                    });
                }
            });
        }).done();
}
