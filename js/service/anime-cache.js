"use strict";

var cache = {};

var AnimeCache = {};

AnimeCache.Contains = function (anime_name) {
    return cache.hasOwnProperty(anime_name);
};

AnimeCache.GetLastestPublish = function (anime_name) {
    if (cache.hasOwnProperty(anime_name)) {
        return cache[anime_name].latestPublish;
    }
    return 0;
}

AnimeCache.GetEpisodes = function (anime_name) {
    if (cache.hasOwnProperty(anime_name)) {
        return cache[anime_name].episodes;
    }
    return null;
};

AnimeCache.SetEpisodes = function (anime_name, episodes) {
    if (!cache.hasOwnProperty(anime_name)) {
        cache[anime_name] = {
            episodes: [],
            latestPublish: 0
        };
    }

    if (episodes.length === 0) {
        return false;
    }

    var anime_cache = cache[anime_name];
    var latestEpisode = episodes[0];

    if (latestEpisode.publish > anime_cache.latestPublish) {
        anime_cache.episodes = episodes;
        anime_cache.latestPublish = latestEpisode.publish;
        return true;
    }

    return false;

};

module.exports = AnimeCache;
