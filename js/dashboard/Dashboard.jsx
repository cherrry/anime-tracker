var Dashboard = React.createClass({
    getInitialState: function () {
        return {
            isReadyToDownload: false
        };
    },
    render: function () {
        var trackingAnimes = [
            "Pokemon XY",
            "暗殺教室",
            "Aldnoah Zero",
            "東京喰種 √A"
        ];
        return (
            <div>
                <AnimeList animes={ trackingAnimes } isReadyToDownload={ this.props.isReadyToDownload } />
            </div>
        );
    }
});
