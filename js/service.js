"use strict";

var Q = require("q");
var moment = require("moment");

var sources = require("./tracker/sources.js");
var Tracker = require("./tracker.js");
var AnimeCache = require("./service/anime-cache.js");

chrome.runtime.onMessage.addListener(onAnimeInit);

function onAnimeInit(message) {
    var anime = message.anime;

    if (message.type !== "anime-init:request" || !sources.hasOwnProperty(anime)) {
        return;
    }

    RetrieveAnime(anime, true)
        .then(function (episodes) {
            chrome.runtime.sendMessage({
                type: "anime-init:response",
                anime: anime,
                episodes: episodes
            });
        });
}

function RetrieveAnime(anime, useCache) {

    var episodes = AnimeCache.GetEpisodes(anime);
    if (episodes !== null && useCache) {
        return Q(episodes);
    }

    var defer = Q.defer();

    Tracker.Retrieve(anime)
        .then(function (episodes) {
            AnimeCache.SetEpisodes(anime, episodes);
            defer.resolve(episodes);
        }).done();

    return defer.promise;

}

function Initialize() {
    for (var anime_name in sources) {
        Initialize_Anime(anime_name);
    }
}

function Initialize_Anime(anime_name) {
    var anime = sources[anime_name];
    RetrieveAnime(anime_name, false)
        .then(function (episodes) {
            var latestPublishTime = AnimeCache.GetLastestPublish(anime_name);

            var _storedDefault = {};
            _storedDefault[anime_name] = 0;

            chrome.storage.local.get({
                latestPublish: _storedDefault
            }, function (storage) {
                var storedPublishTime = storage.latestPublish[anime_name];

                if (latestPublishTime > storedPublishTime) {

                    // TODO: send notification
                    console.log("updated", anime_name);

                    chrome.runtime.sendMessage({
                        type: "anime-update",
                        anime: anime_name,
                        episodes: episodes,
                        publish: latestPublishTime
                    });

                    storage.latestPublish[anime_name] = latestPublishTime;
                    chrome.storage.local.set(storage);
                }
            });

            // TODO: determine the next update time in a clever way
            setTimeout(function () {
                Initialize_Anime(anime_name);
            }, 90000); // 15-mins
        }).done();
}
Initialize();
