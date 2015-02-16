var Dashboard = React.createClass({
    getInitialState: function () {
        return {
            isReadyToDownload: false
        };
    },
    render: function () {
        var trackingAnimes = [
            "Pokemon XY",
            "暗殺教室"
        ];
        return (
            <div>
                <AnimeList animes={ trackingAnimes } isReadyToDownload={ this.props.isReadyToDownload } />
            </div>
        );
    }
});
