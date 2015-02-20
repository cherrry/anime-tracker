var Episode = React.createClass({
    _download: function (event) {
        var magnet = this.props.episode.magnet;
        console.log('download', magnet);
    },
    _open_link: function (event) {
        window.open(this.props.episode.link, '_blank');
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

        var style = null;
        if (moment(episode.publish).isAfter(moment().subtract(7, 'day')))
        {
            style = " warning"
        }
        
        return (
            <tr className= { "episode" + style }>
                <td className="left aligned">
                    <a onClick = { this._open_link }>
                        { this.props.name } { episode.episode }
                    </a>
                </td>
                <td className="collapsing right aligned">
                    <div className="datetime" title={episode.publish.format("YYYY-MM-DD HH:mm")}>
                        { episode.publish.fromNow() }
                    </div>
                </td>
                <td className="collapsing center aligned">{ downloadIcon }</td>
            </tr>
        );
    }
});
