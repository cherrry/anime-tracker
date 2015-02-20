"use strict";

var AnimeTracker = require("./../AnimeTracker.js");
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
            return <Episode name={ self.props.name } episode={ episode } key={ key } />
        });

        for (var i = Episodes.length; i < 4; i++) {
            var key = this.props.name + '-empty-' + i;
            Episodes.push(<TableRowFiller cols="3" content="Not Available" key={ key } />);
        }

        var MoreButton = null;
        if (!this.state.show_all) {
            MoreButton = (
                <div className="ui one column centered grid anime-more">
                    <div className="ui button" onClick={ this._reload }>
                        <i className="plus icon"></i>
                        More
                    </div>
                </div>
            );
        }
        
        var dimmer = null;
        if (!this.state.is_loaded) {
            dimmer = <tbody className="ui active inverted dimmer anime-dimmer"></tbody>;
            MoreButton = (
                <div className="ui one column centered grid anime-more">
                    <div className="ui loading button">Loading</div>
                </div>
            );
        }
        
        var floating = null;
        if ( this.state.episodes.length > 0 )
        {
            floating = <div className="floating ui yellow circular label">{ this.state.episodes[0].episode }</div>
        }

        return (
            <div className="column">
                <div className="ui segment">
                    <span className="ui green ribbon label anime-name">{ this.props.name }</span>
                        { floating }
                        <table className="ui table">
                            { dimmer }
                            <tbody>{ Episodes }</tbody>
                        </table>
                        { MoreButton }
                </div>
            </div>
        );
    }
});

module.exports = Anime;
