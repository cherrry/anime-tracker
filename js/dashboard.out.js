(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

module.exports = AnimeTracker;


},{}],2:[function(require,module,exports){
"use strict";

var Dashboard = require("./dashboard/Dashboard.jsx");

var anime_feeds = document.getElementById('anime-feeds');
React.render(React.createElement(Dashboard), anime_feeds);


},{"./dashboard/Dashboard.jsx":5}],3:[function(require,module,exports){
"use strict";

var AnimeTracker = require("./../AnimeTracker.js");
var Episode = require("./Episode.jsx");
var TableRowFiller = require("./TableRowFiller.jsx");

var Anime = React.createClass({displayName: "Anime",
    getInitialState: function () {
        return {
            is_loaded: false,
            episodes: [],
            show_all: false
        };
    },
    _animeRetrievedCallback: function (response) {
        if (response.response === "ok") {
            this.setState({
                is_loaded: true,
                episodes: response.data,
                show_all: response.show_all
            });
        }
    },
    _reload: function (event) {
        this.setState({
            is_loaded: false
        });
        AnimeTracker.retrieve_all(this.props.name, this._animeRetrievedCallback);
    },
    componentDidMount: function () {
        AnimeTracker.retrieve(this.props.name, this._animeRetrievedCallback);
    },
    render: function () {
        var self = this;
        var Episodes = this.state.episodes.map(function (episode) {
            var key = self.props.name + '-episode-' + episode.episode;
            return React.createElement(Episode, {name:  self.props.name, episode: episode, key: key })
        });

        for (var i = Episodes.length; i < 4; i++) {
            var key = this.props.name + '-empty-' + i;
            Episodes.push(React.createElement(TableRowFiller, {cols: "3", content: "Not Available", key: key }));
        }

        var MoreButton = null;
        if (!this.state.show_all) {
            MoreButton = (
                React.createElement("div", {className: "ui one column centered grid anime-more"}, 
                    React.createElement("div", {className: "ui button", onClick:  this._reload}, 
                        React.createElement("i", {className: "plus icon"}), 
                        "More"
                    )
                )
            );
        }
        
        var dimmer = null;
        if (!this.state.is_loaded) {
            dimmer = React.createElement("tbody", {className: "ui active inverted dimmer anime-dimmer"});
            MoreButton = (
                React.createElement("div", {className: "ui one column centered grid anime-more"}, 
                    React.createElement("div", {className: "ui loading button"}, "Loading")
                )
            );
        }
        
        var floating = null;
        if ( this.state.episodes.length > 0 )
        {
            floating = React.createElement("div", {className: "floating ui yellow circular label"},  this.state.episodes[0].episode)
        }

        return (
            React.createElement("div", {className: "column"}, 
                React.createElement("div", {className: "ui segment"}, 
                    React.createElement("span", {className: "ui green ribbon label anime-name"},  this.props.name), 
                        floating, 
                        React.createElement("table", {className: "ui table"}, 
                            dimmer, 
                            React.createElement("tbody", null, Episodes )
                        ), 
                        MoreButton 
                )
            )
        );
    }
});

module.exports = Anime;


},{"./../AnimeTracker.js":1,"./Episode.jsx":6,"./TableRowFiller.jsx":7}],4:[function(require,module,exports){
"use strict";

var Anime = require("./Anime.jsx");

var AnimeList = React.createClass({displayName: "AnimeList",
    render: function () {
        var isReadyToDownload = this.props.isReadyToDownload;
        var Animes = this.props.animes.map(function (animeName) {
            var key = "anime-" + animeName;
            return React.createElement(Anime, {name: animeName, key: key });
        });
        return (
            React.createElement("div", {className: "ui three column stackable doubling grid"}, 
                Animes 
            )
        );
    }
});

module.exports = AnimeList;


},{"./Anime.jsx":3}],5:[function(require,module,exports){
"use strict";

var AnimeList = require("./AnimeList.jsx");

var Dashboard = React.createClass({displayName: "Dashboard",
    render: function () {
        var trackingAnimes = [
            "Pokemon XY",
            "暗殺教室",
            "Aldnoah Zero",
            "東京喰種 √A"
        ];
        return (
            React.createElement("div", null, 
                React.createElement(AnimeList, {animes: trackingAnimes })
            )
        );
    }
});

module.exports = Dashboard;


},{"./AnimeList.jsx":4}],6:[function(require,module,exports){
"use strict";

var Episode = React.createClass({displayName: "Episode",
    _download: function (event) {
        var magnet = this.props.episode.magnet;
        console.log('send download request', magnet);
        chrome.runtime.sendMessage({
            type: "download",
            magnet: magnet
        }, function (response) {
            console.log(response);
        });
    },
    render: function () {
        var episode = this.props.episode;

        var additionalStyle = "";
        if (moment(episode.publish).isAfter(moment().subtract(7, 'day'))) {
            additionalStyle = " warning"
        }
        
        return (
            React.createElement("tr", {className:  "episode" + additionalStyle}, 
                React.createElement("td", {className: "left aligned"}, 
                    React.createElement("a", {href:  episode.link, target: "_blank"},  this.props.name, " ",  episode.episode)
                ), 
                React.createElement("td", {className: "collapsing right aligned"}, 
                    React.createElement("div", {className: "datetime", title:  episode.publish.format("YYYY-MM-DD HH:mm") }, 
                         episode.publish.fromNow() 
                    )
                ), 
                React.createElement("td", {className: "collapsing center aligned"}, 
                    React.createElement("a", {className: "episode-download", onClick:  this._download}, 
                        React.createElement("i", {className: "download icon"})
                    )
                )
            )
        );
    }
});

module.exports = Episode;


},{}],7:[function(require,module,exports){
"use strict";

var TableRowFiller = React.createClass({displayName: "TableRowFiller",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", {className: "center aligned", colSpan:  this.props.cols},  this.props.content)
            )
        );
    }
});

module.exports = TableRowFiller;


},{}]},{},[2]);
