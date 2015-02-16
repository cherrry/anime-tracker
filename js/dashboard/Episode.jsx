var Episode = React.createClass({
    _download: function (event) {
        var magnet = this.props.episode.magnet;
        console.log('download', magnet);
    },
    render: function () {
        var episode = this.props.episode;

        var downloadIcon = <i className="download icon"></i>
        if ( this.props.isReadyToDownload ) {
            downloadIcon = (
                <a className="episode-download" onClick={ this._download }>
                    { downloadIcon }
                </a>
            );
        }

        return (
            <tr className="episode">
                <td className="left aligned">{ this.props.name } { episode.episode }</td>
                <td className="collapsing right aligned">{ episode.publish.fromNow() }</td>
                <td className="collapsing center aligned">{ downloadIcon }</td>
            </tr>
        );
    }
});
