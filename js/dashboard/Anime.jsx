var Anime = React.createClass({
    getInitialState: function () {
        return {
            is_loaded: false,
            episodes: []
        };
    },
    _animeRetrievedCallback: function (response) {
        if (response.response === "ok") {
            this.setState({
                is_loaded: true,
                episodes: response.data
            });
        }
    },
    componentDidMount: function () {
        AnimeTracker.retrieve(this.props.name, this._animeRetrievedCallback);
    },
    render: function () {
        var self = this;
        var isReadyToDownload = this.props.isReadyToDownload;
        var Episodes = this.state.episodes.map(function (episode) {
            var key = self.props.name + '-episode-' + episode.episode;
            return <Episode name={ self.props.name } episode={ episode } key={ key } isReadyToDownload={ isReadyToDownload } />
        });

        for (var i = Episodes.length; i < 4; i++) {
            var key = this.props.name + '-empty-' + i;
            Episodes.push(<TableRowFiller cols="3" content="Not Available" key={ key } />);
        }

        var dimmer = null;
        if (!this.state.is_loaded) {
            dimmer = <tbody className="ui active inverted dimmer anime-dimmer"></tbody>;
        }

        return (
            <div className="column">
                <div className="ui segment">
                    <span className="ui green ribbon label anime-name">{ this.props.name }</span>
                        <table className="ui table">
                            { dimmer }
                            <tbody>{ Episodes }</tbody>
                        </table>
                </div>
            </div>
        );
    }
});
