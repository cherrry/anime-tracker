"use strict";

var AnimeTracker = (function () {
    var _get_episode_regex = /第([\d-]+)話/;

    var AnimeTracker = {};

    AnimeTracker.animesRss = {
        'Pokemon XY': {
            'rss_source': 'http://share.dmhy.org/topics/rss/rss.xml',
            'keyword': '夢幻戀櫻字幕組 Pocket Monsters XY BIG5',
            'episode_regex': /第(.+)話/
        },
        '暗殺教室': {
            'rss_source': 'http://share.dmhy.org/topics/rss/rss.xml',
            'keyword': '豌豆字幕組 暗殺教室 BIG5',
            'episode_regex': /room\]\[(\d+)\]\[BIG5/
        },
        'Aldnoah Zero': {
            'rss_source': 'http://share.dmhy.org/topics/rss/rss.xml',
            'keyword': '諸神字幕組 Aldnoah Zero 1080P MKV',
            'episode_regex': /ro\]\[(.+)\]\[1080P/
        },
        '東京喰種 √A': {
            'rss_source': 'http://share.dmhy.org/topics/rss/rss.xml',
            'keyword': '極影字幕社 東京喰種 BIG5',
            'episode_regex': /A】 【(.+)】BIG5/
        }
    };

    AnimeTracker.retrieve = _retrieve;
    AnimeTracker.retrieve_all = _retrieve_all;

    return AnimeTracker;

    function _retrieve (anime_name, callback) {
        var rss_data = AnimeTracker.animesRss[anime_name];
        _get_latest_episodes(rss_data, 4, callback);
    }
    
    function _retrieve_all (anime_name, callback) {
        var rss_data = AnimeTracker.animesRss[anime_name];
        _get_latest_episodes(rss_data, 1000, callback);
    }

    // retrieve latest episode data from rss feed
    function _get_latest_episodes (rss_data, length, callback) {

        var rss_source = rss_data.rss_source;
        var keyword = rss_data.keyword;
        var episode_regex = rss_data.episode_regex;

        var request = new XMLHttpRequest();

        var request_url = rss_source + '?keyword=' + encodeURI(keyword);
        request.open('GET', request_url, true);
        console.log(request_url);

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
                var info = _get_info(item, episode_regex);
                if (info.episode != 'N/A')
                {
                    result.push(info);
                }
            }

            callback({
                response: 'ok',
                data: result,
                show_all: ((length > 999) ? true : false)
            });
        };

        request.send();
    }

    // info extractor
    function _get_info (item, episode_regex) {
        var match = null;
        var title = item.querySelector('title').innerHTML;
        var link = item.querySelector('link').innerHTML;
        var magnet = item.querySelector('enclosure').getAttribute('url');
        var publish = moment(new Date(item.querySelector('pubDate').innerHTML));

        var episode = 'N/A';
        if (match = episode_regex.exec(title)) {
            episode = match[1];
        }

        return {
            watched: false,
            episode: episode,
            link: link,
            magnet: magnet,
            publish: publish
        };
    }

})();
