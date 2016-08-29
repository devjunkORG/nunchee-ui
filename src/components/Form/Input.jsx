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
        const { label, labeled, left, icon, maxLength, required, ...rest } = this.props;
        let fieldClasses = classNames({
            ui: labeled,
            labeled: labeled,
            fluid: labeled,
            input: labeled,
            field: !labeled,
            left: left ? true : false,
            icon: icon ? true : false
        });
        let inputClasses = classNames({
            ui: true,
            input: true,
            corner: required,
            labeled: labeled || required,
        });
        let labelClasses = classNames({
            ui: labeled,
            label: label
        });
        /*let inputClasses = classNames({
            fluid: this.props.fluid
        });*/
        return (
            <div className="field">
                <div className={fieldClasses}>
                    <label className={labelClasses}>{label}</label>
                    <div className={inputClasses}>
                        <input
                            ref={name}
                            {...rest}
                            onChange={ this.handleChange }
                        />
                        {this.props.icon ?
                            <i className={`${icon} icon`}></i> : ''
                        }
                        {this.props.required ?
                            <div className="ui red corner label">
                                <i className="asterisk white icon"></i>
                            </div> : ''
                        }
                    </div>
                    {/* Display character count if maxLength is set*/}
                    {maxLength ?
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
