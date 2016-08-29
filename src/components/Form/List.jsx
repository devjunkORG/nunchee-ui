import React from 'react';
import { take } from 'lodash';
const _ = {
    take: take
};

class List extends React.Component {

    constructor(props) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isActive = this.isActive.bind(this);
        this.delimiters = this.props.delimiters || [ ',', ' ' ];
        this.unique = this.props.unique ? this.props.unique : true;
        this.max = this.props.max || 0;
        this.state = this.initialize();
    }

    initialize() {
        return {
            active: false,
            elements: []
        }
    }
    handleFocus() {
        this._input.focus();
        this.setState({ active: true });
    }
    handleBlur() {
        this.setState({ active: false });
    }
    handleClick() {
        this._input.focus();
    }
    isActive() {
        return this.state.active ? ' active' : false;
    }
    handleChange(e) {
        let val = e.target.value;
        let chr = val[val.length-1];
        if (this.delimiters.indexOf(chr) > -1 && val.trim().length >= 1 && val !== ' ') {
            this.addTag(e.target.value.replace(',',''));
            e.target.value = '';
        }
    }
    handleKeyPress(e) {
        if (e.which === 8 && e.target.value.length === 0) {
            let elements = this.state.elements;
            this.setState({ elements: _.take(this.state.elements,this.state.elements.length-1)})
        }
    }
    addTag(val) {
        let elements = this.state.elements;
        if (elements.indexOf(val.trim()) > -1 && this.unique) {
            return false;
        }
        if (this.max > 0 && elements.length >= this.max) {
            return false;
        }
        elements.push(val.trim());
        return this.setState({ elements: elements });
    }
    render() {
        let inputStyles = {
            background: 'none',
            border: 'none',
            width: 'auto'
        };
        let listStyle = {
            display: 'flex',
            cursor: 'text'
        };
        return (
            <div className="field">
                {this.props.label ?
                    <label>{this.props.label}</label> : ''
                }
                <div
                    ref={ list => this._list = list }
                    className={`styled list ${this.isActive()}`}
                    style={ listStyle }
                    onClick={ this.handleClick }
                >
                    <input type="hidden" name={this.props.name} value={this.state.elements.join(',')} />
                    <div className="elements">
                        {this.state.elements.map((element,k) => {
                            return (
                                <div key={k} className="ui label transition visible">
                                    {element}
                                </div>
                            );
                        })}
                        <input
                            ref={ input => this._input = input }
                            onKeyDown={ this.handleKeyPress }
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur }
                            onChange={ this.handleChange }
                            style={ inputStyles }
                            name={this.props.name}
                            type="text"
                            placeholder={this.props.placeholder}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
