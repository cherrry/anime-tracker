var AnimeList = React.createClass({
    render: function () {
        var isReadyToDownload = this.props.isReadyToDownload;
        var Animes = this.props.animes.map(function (animeName) {
            var key = "anime-" + animeName;
            return <Anime name={ animeName } key={ key } isReadyToDownload={ isReadyToDownload } />;
        });
        return (
            <div className="ui three column stackable doubling grid">
                { Animes }
            </div>
        );
    }
});
