import React from 'react';
import ReactDOM from 'react-dom';
import JsonTable from 'react-json-table';
import classNames from 'classnames';
import _ from 'lodash';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        /*
         * objects are passed by reference, which means that in order to keep
         * the parent state data intact, we have to clone the object.
         * simply using a variable would not work, since this creates another
         * reference.
         */
        let rows = _.clone(this.props.rows);
        if (this.props.defaultRow && !_.find(rows,this.props.defaultRow)) {
            rows.unshift(this.props.defaultRow);
        }
        this.state = {
            rows: []
        };
    }

    componentWillReceiveProps(newProps) {
        const currentRows = this.state.rows;
        const expectedInitialRows = this.props.defaultRow ? 1 : 0;
        let rows = newProps.rows.map(item => {
            if (currentRows.length > expectedInitialRows && !_.find(currentRows,item)) {
                item._new = true;
            }
            return item;
        });
        if (newProps.defaultRow && !_.find(rows,newProps.defaultRow)) {
            rows.unshift(newProps.defaultRow);
        }
        this.setState({ rows: rows });
    }

    render() {
        let classes = classNames({
            ui: true,
            table: true,
            admin: true
        });

        return (
            <JsonTable
                className={ classes }
                rows={ this.state.rows }
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
};

export default Table;
