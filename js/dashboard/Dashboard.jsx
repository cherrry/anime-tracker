"use strict";

var React = require("react");

var AnimeList = require("./AnimeList.jsx");

var Dashboard = React.createClass({
    render: function () {
        var trackingAnimes = [
            "Pokemon XY",
            "逆轉裁判"
        ];
        return (
            <div>
                <AnimeList animes={ trackingAnimes } />
            </div>
        );
    }
});

module.exports = Dashboard;
