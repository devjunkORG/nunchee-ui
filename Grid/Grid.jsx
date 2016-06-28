import React from 'react';
import classNames from 'classnames'
import n2w from 'num-to-word';

class Grid extends React.Component {

    constructor() {
        super();
    }

    render() {
        let classes = classNames({
            ui: true,
            grid: true
        });
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

class Column extends React.Component {

    constructor() {
        super();
    }

    render() {
        let classes = {
            ui: true,
            column: true
        };
        if (this.props.width) {
            let word = n2w(this.props.width);
            classes[word] = true;
        }
        classes = classNames(classes);
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

class Row extends React.Component {

    constructor() {
        super();
    }

    render() {
        let classes = {
            ui: true,
            row: true
        };
        if (this.props.columns) {
            let word = n2w(this.props.columns);
            classes[word] = true;
            classes['column'] = true;
        }
        classes = classNames(classes);
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

export { Grid, Column, Row };
