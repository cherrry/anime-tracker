"use strict";

var React = require("react");

var Episode = require("./Episode.jsx");
var TableRowFiller = require("./TableRowFiller.jsx");

var Anime = React.createClass({
    getInitialState: function () {
        return {
            is_loaded: false,
            episodes: [],
            show_all: false
        };
    },
    _toggleShowAll: function (event) {
        var show_all = this.state.show_all;
        this.setState({
            show_all: !show_all
        });
    },
    _onAnimeUpdate: function (message) {
        if ((message.type !== "anime-update" && message.type !== "anime-init:response") || message.anime !== this.props.name) {
            return;
        }
        this.setState({
            is_loaded: true,
            episodes: message.episodes,
        });
    },
    componentDidMount: function () {
        chrome.runtime.onMessage.addListener(this._onAnimeUpdate);
        chrome.runtime.sendMessage({
            type: "anime-init:request",
            anime: this.props.name
        });
    },
    componentWillUnmount: function () {
        chrome.runtime.onMessage.removeListener(this._onAnimeUpdate);
    },
    render: function () {
        var self = this;

        var limit = this.state.show_all ? -1 : 4;
        var episodes = this.state.episodes.slice(0, limit);

        var Episodes = episodes.map(function (episode) {
            var key = self.props.name + '-episode-' + episode.episode;
            return <Episode name={ self.props.name } episode={ episode } key={ key } />
        });

        for (var i = Episodes.length; i < 4; i++) {
            var key = this.props.name + '-empty-' + i;
            Episodes.push(<TableRowFiller cols="3" content="Not Available" key={ key } />);
        }

        var ToggleButton = null;
        if (this.state.show_all) {
            ToggleButton = (
                <div className="ui button" onClick={ this._toggleShowAll }>
                    <i className="minus icon"></i>
                    Less
                </div>
            );
        } else {
            ToggleButton = (
                <div className="ui button" onClick={ this._toggleShowAll }>
                    <i className="plus icon"></i>
                    More
                </div>
            );
        }

        var Dimmer = null;
        if (!this.state.is_loaded) {
            Dimmer = <tbody className="ui active inverted dimmer anime-dimmer"></tbody>;
        }

        var EpisodeCount = null;
        if ( this.state.episodes.length > 0 )
        {
            EpisodeCount = <div className="floating ui yellow circular label">{ this.state.episodes[0].episode }</div>
        }

        return (
            <div className="column">
                <div className="ui segment">
                    <span className="ui green ribbon label anime-name">{ this.props.name }</span>
                    { EpisodeCount }
                    <table className="ui table">
                        { Dimmer }
                        <tbody>{ Episodes }</tbody>
                    </table>
                    <div className="ui one column centered grid anime-more">
                        { ToggleButton }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Anime;
