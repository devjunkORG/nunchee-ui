/*
    Tabular menu component
 */
import React from 'react';
import classNames from 'classnames';

class Menu extends React.Component {

    render() {
        return (
            <div className="ui tabular menu">
                {this.props.children}
            </div>
        )
    }
}

class Tab extends React.Component {

    componentDidMount() {
        $('.ui.menu .item').tab();
    }

    render() {
        let tabClass = classNames({
            item: true,
            active: this.props.default
        });
        return (
            <div className={tabClass} data-tab={this.props.name}>{this.props.children}</div>
        );
    }
}
class TabSegment extends React.Component {

}
class TabSegments extends React.Component {
    render() {
        let segmentClass = classNames({
            ui: true,
            active: this.props.default,
            tab: true,
            segments: (!this.props.noContain)
        });
        return (
            <div className={segmentClass}  data-tab={this.props.name}>
                {this.props.children}
            </div>
        );
    }
}

export { Menu, Tab, TabSegment, TabSegments };
