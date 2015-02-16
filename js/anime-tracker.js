"use strict";

var AnimeTracker = (function () {
    var _get_episode_regex = /第([\d-]+)話/;

    var AnimeTracker = {};

    AnimeTracker.animesRss = {
        'Pokemon XY': {
            'rss_source': 'http://share.dmhy.org/topics/rss/rss.xml',
            'keyword': '夢幻戀櫻字幕組 Pocket Monsters BIG5',
            'episode_regex': /第([\d-]+)話/
        },
        '暗殺教室': {
            'rss_source': 'http://share.dmhy.org/topics/rss/rss.xml',
            'keyword': '豌豆字幕組 暗殺教室 BIG5',
            'episode_regex': /room\]\[(\d+)\]\[BIG5/
        }
    };

    AnimeTracker.retrieve = _retrieve;

    return AnimeTracker;

    function _retrieve (anime_name, callback) {
        var rss_data = AnimeTracker.animesRss[anime_name];
        _get_latest_episodes(rss_data, 4, callback);
    }

    // retrieve latest episode data from rss feed
    function _get_latest_episodes (rss_data, length, callback) {

        var rss_source = rss_data.rss_source;
        var keyword = rss_data.keyword;
        var episode_regex = rss_data.episode_regex;

        var request = new XMLHttpRequest();

        var request_url = rss_source + '?keyword=' + encodeURI(keyword);
        request.open('GET', request_url, true);

        request.onload = function () {
            if (!(request.status >= 200 && request.status < 400)) {
                callback({
                    response: 'error',
                    data: null
                });
            }

            var response = request.responseText;
            var parser = new DOMParser();
            var feed = parser.parseFromString(response, 'application/xml');

            var items = feed.querySelectorAll('item');

            var result = [];
            for (var i = 0, _len = items.length; i < _len && i < length; i++) {
                var item = items[i];
                result.push(_get_info(item, episode_regex));
            }

            callback({
                response: 'ok',
                data: result
            });
        };

        request.send();
    }

    // info extractor
    function _get_info (item, episode_regex) {
        var match = null;
        var title = item.querySelector('title').innerHTML;
        var magnet = item.querySelector('enclosure').getAttribute('url');
        var publish = moment(new Date(item.querySelector('pubDate').innerHTML));

        var episode = 'N/A';
        if (match = episode_regex.exec(title)) {
            episode = match[1];
        }

        return {
            watched: false,
            episode: episode,
            magnet: magnet,
            publish: publish
        };
    }

})();
