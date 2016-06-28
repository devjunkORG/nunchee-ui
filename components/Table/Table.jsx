import React from 'react';
import ReactDOM from 'react-dom';
import JsonTable from 'react-json-table';
import classNames from 'classnames';
import _ from 'lodash';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let classes = classNames({
            ui: true,
            table: true,
            admin: true
        });

        /*
         * objects are passed by reference, which means that in order to keep
         * the parent state data intact, we have to clone the object.
         * simply using a variable would not work, since this creates another
         * reference.
         */
        let rows = _.clone(this.props.rows);
        if (this.props.defaultRow && !_.find(rows,this.props.defaultRow)) {
            rows.splice(0,0,this.props.defaultRow);
        }

        return (
            <JsonTable
                className={ classes }
                rows={ rows }
                columns={ this.props.columns }
                settings={ this.props.settings }
            />
        );
    }
}

Table.propTypes = {
    rows: React.PropTypes.array
};
Table.defaultProps = {
    rows: []
}

export default Table;
