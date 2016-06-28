/* global $ */
/**
 * Input Component
 * Takes the following options:
 *
 * {
     type: 'type of input field',
     placeholder: 'Placeholdere text',
     label: 'Field label',
     defaultvalue: 'Default value'
    },
 */
import React from 'react';
import classNames from 'classnames';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this._wordCountClass = classNames({
            wordCount: true,
            max: false
        });
        this.state = {
            value: '',
            count: 0
        };
    }

    handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this._wordCountClass = classNames({
            wordCount: true,
            max: e.target.value.length >= this.props.maxLength
        });
        this.setState({ count: e.target.value.length });
    }

    render() {
        let fieldClasses = classNames({
            ui: this.props.labeled,
            labeled: this.props.labeled,
            fluid: this.props.labeled,
            input: this.props.labeled,
            field: !this.props.labeled,
            left: this.props.left ? true : false,
            icon: this.props.icon ? true : false
        });
        let labelClasses = classNames({
            ui: this.props.labeled,
            label: this.props.label
        });
        /*let inputClasses = classNames({
            fluid: this.props.fluid
        });*/
        return (
            <div className="field">
                <div className={fieldClasses}>
                    <label className={labelClasses}>{this.props.label}</label>
                    <input
                        ref={this.props.name}
                        {...this.props}
                        onChange={ this.handleChange }
                    />
                    {this.props.icon ?
                        <i className={`${this.props.icon} icon`}></i> : ''
                    }
                    {/* Display character count if maxLength is set*/}
                    {this.props.maxLength ?
                        <p
                            ref={wordCount => { this._wordCount = wordCount; } }
                            className={ this._wordCountClass }>
                            {this.state.count}/{this.props.maxLength}
                        </p> : ''
                    }
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    type: React.PropTypes.string
};
Input.defaultProps = {
    type: 'text'
};

export { Input };
export default Input;
