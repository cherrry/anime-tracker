"use strict";

module.exports = {
    "Pokemon XY": {
        rss_source: 'http://share.dmhy.org/topics/rss/rss.xml',
        keyword: '夢幻戀櫻字幕組 Pocket Monsters XY BIG5',
        episode_regex: /第(.+)話/,
        weekday: 5
    },
    "暗殺教室": {
        rss_source: 'http://share.dmhy.org/topics/rss/rss.xml',
        keyword: '豌豆字幕組 暗殺教室 BIG5',
        episode_regex: /room\]\[(\d+)\]\[BIG5/,
        weekday: 6
    },
    "Aldnoah Zero": {
        rss_source: 'http://share.dmhy.org/topics/rss/rss.xml',
        keyword: '諸神字幕組 Aldnoah Zero 1080P MKV',
        episode_regex: /ro\]\[(.+)\]\[1080P/,
        weekday: 0
    },
    "東京喰種 √A": {
        rss_source: 'http://share.dmhy.org/topics/rss/rss.xml',
        keyword: '極影字幕社 東京喰種 BIG5',
        episode_regex: /A】 【(.+)】BIG5/,
        weekday: 5
    }
};
