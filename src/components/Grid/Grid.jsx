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
            centered: this.props.centered || false,
            right:     this.props.right || false,
            left:       this.props.left || false,
            aligned: this.props.aligned || false,
            floated: this.props.floated || false,
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
            right:     this.props.right || false,
            floated: this.props.floated || false,
            aligned: this.props.aligned || false,
            column: true
        };
        if (this.props.width) {
            let word = n2w(this.props.width);
            classes[word] = true;
            classes['wide'] = true;
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
