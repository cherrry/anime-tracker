"use strict";

var React = require("react");

var TableRowFiller = React.createClass({
    render: function () {
        return (
            <tr>
                <td className="center aligned" colSpan={ this.props.cols }>{ this.props.content }</td>
            </tr>
        );
    }
});

module.exports = TableRowFiller;
