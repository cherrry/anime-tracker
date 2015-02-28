"use strict";

var React = require("react");

var Anime = require("./Anime.jsx");

var AnimeList = React.createClass({
    render: function () {
        var isReadyToDownload = this.props.isReadyToDownload;
        var Animes = this.props.animes.map(function (animeName) {
            var key = "anime-" + animeName;
            return <Anime name={ animeName } key={ key } />;
        });
        return (
            <div className="ui three column stackable doubling grid">
                { Animes }
            </div>
        );
    }
});

module.exports = AnimeList;
