"use strict";

var Q = require("q");
var $ = require("jquery");
var moment = require("moment");

var sources = require("./tracker/sources.js");

var Tracker = {};

Tracker.Retrieve = function (anime_name) {
    var defer = Q.defer();

    var rss_data = sources[anime_name];

    var rss_source = rss_data.rss_source;
    var keyword = rss_data.keyword;
    var episode_regex = rss_data.episode_regex;

    Q($.ajax({
        type: "GET",
        url: rss_source,
        data: {
            keyword: keyword
        }
    })).then(function (data) {

        var results = [];

        $(data).find("item").each(function (index, item) {
            var info = GetItemInfo($(item), episode_regex);

            if (info.episode !== "N/A") {
                results.push(info);
            }
        });

        defer.resolve(results);

    }).catch(function () {
        defer.reject("Failed to retrieve anime data: " + anime_name);
    });

    return defer.promise;
};

function GetItemInfo(item, episode_regex) {
    var match = null;

    var title = item.find("title").text();
    var link = item.find("link").text();
    var magnet = item.find("enclosure").attr("url");
    var publish = moment(new Date(item.find("pubDate").text()));

    var episode = "N/A";
    if (match = episode_regex.exec(title)) {
        episode = match[1];
    }

    return {
        episode: episode,
        link: link,
        magnet: magnet,
        publish: publish
    };
}

module.exports = Tracker;
