var TableRowFiller = React.createClass({
    render: function () {
        return (
            <tr>
                <td className="center aligned" colSpan={ this.props.cols }>{ this.props.content }</td>
            </tr>
        );
    }
});
