"use strict";

var Episode = React.createClass({
    _download: function (event) {
        var magnet = this.props.episode.magnet;
        console.log('send download request', magnet);
        chrome.runtime.sendMessage({
            type: "download",
            magnet: magnet
        }, function (response) {
            console.log(response);
        });
    },
    render: function () {
        var episode = this.props.episode;

        var additionalStyle = "";
        if (moment(episode.publish).isAfter(moment().subtract(7, 'day'))) {
            additionalStyle = " warning"
        }
        
        return (
            <tr className={ "episode" + additionalStyle }>
                <td className="left aligned">
                    <a href={ episode.link } target="_blank">{ this.props.name } { episode.episode }</a>
                </td>
                <td className="collapsing right aligned">
                    <div className="datetime" title={ episode.publish.format("YYYY-MM-DD HH:mm") }>
                        { episode.publish.fromNow() }
                    </div>
                </td>
                <td className="collapsing center aligned">
                    <a className="episode-download" onClick={ this._download }>
                        <i className="download icon"></i>
                    </a>
                </td>
            </tr>
        );
    }
});

module.exports = Episode;
