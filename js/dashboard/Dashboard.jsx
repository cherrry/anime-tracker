"use strict";

var React = require("react");

var AnimeList = require("./AnimeList.jsx");

var Dashboard = React.createClass({
    render: function () {
        var trackingAnimes = [
            "Pokemon XY",
            "暗殺教室",
            "Aldnoah Zero",
            "東京喰種 √A"
        ];
        return (
            <div>
                <AnimeList animes={ trackingAnimes } />
            </div>
        );
    }
});

module.exports = Dashboard;
