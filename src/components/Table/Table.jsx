import React from 'react';
import ReactDOM from 'react-dom';
import JsonTable from 'react-json-table';
import classNames from 'classnames';
import _ from 'lodash';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.checkPosition = this.checkPosition.bind(this);
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
            rows: [],
            atBottom: false
        };
    }

    componentDidMount() {
        document.addEventListener('scroll', this.checkPosition, true);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.checkPosition, true);
    }

    checkPosition(e) {
        let rect = this._bottom.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0) && this.props.onBottom) {
            if (!this.state.atBottom) {
                this.setState({ atBottom: true });
                this.props.onBottom(e);
            }
        } else {
            if (this.state.atBottom) {
                if (this.props.onLeaveBottom) {
                    this.props.onLeaveBottom(e);
                }
                this.setState({ atBottom: false });
            }
        }
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
            <section>
                <JsonTable
                    ref={ table => this._table = table }
                    className={ classes }
                    rows={ this.state.rows }
                    columns={ this.props.columns }
                    settings={ this.props.settings }
                />
                <div ref={ div => this._bottom = div } style={{ padding: '4rem', opacity: this.state.atBottom ? 1 : 0 }} className="ui segment">
                    <p></p>
                        <div className="ui active inverted dimmer">
                            { this.props.loading ? (
                                <div className="ui text loader">Cargando</div>
                            ) : (
                                <div style={{padding: '0.5rem 0'}}>
                                    {this.props.loadingText ? (
                                        this.props.loadingText
                                    ) : <span></span>}
                                </div>
                            )}
                        </div>
                </div>
            </section>
        );
    }
}

Table.propTypes = {
    rows: React.PropTypes.array,
    onLeaveBottom: React.PropTypes.func,
    onBottom: React.PropTypes.func
};
Table.defaultProps = {
    rows: []
};

export default Table;
