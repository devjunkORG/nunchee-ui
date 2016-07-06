import React from 'react';
import classNames from 'classnames';

class Checkbox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let classes = classNames({
            ui: true,
            checkbox: true,
            slider: this.props.slider || false,
            toggle: this.props.toggle || false
        });
        if (this.props.contain) {
            return (
                <div className="field">
                    <label>{this.props.children}</label>
                    <div className={ classes }>
                        <input type="checkbox" name={this.props.name} defaultChecked={this.props.checked}/>
                        <label></label>
                    </div>
                </div>
            );
        }
        return (
            <div className={ classes }>
                <input type="checkbox" name={this.props.name} defaultChecked={this.props.checked}/>
                <label>{this.props.children}</label>
            </div>
        );
    }
}

export default Checkbox;
