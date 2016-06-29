/* global $ */
import React from 'react';
import classNames from 'classnames';

class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.ui.menu .item').tab();
    }

    render() {
        const props = this.props;
        const children = React.Children.map(this.props.children,
            child => {
                const isActive = (child.props.name === props.activeTab);
                const classes = classNames({
                    item: true,
                    active: isActive
                });
                return React.cloneElement(child, {
                    className: classes,
                    active: isActive
                });
            }
        );
        return (
            <div className="ui tabular menu">
                {children}
            </div>
        );
    }
}

class Tab extends React.Component {

    componentDidMount() {
        $('.ui.menu .item').tab();
    }

    render() {
        let tabClass = classNames({
            item: true,
            active: this.props.active
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
            active: this.props.active,
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
