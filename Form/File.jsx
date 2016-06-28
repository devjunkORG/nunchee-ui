import React from 'react';

import AddButton from '../Buttons/addBig';

class Field extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        let containerStyle = {
            display: 'flex'
        };
        let addButtonStyle = {
            borderRadius: '4px'
        };
        let itemStyle = {
            height: '80px',
            width: '80px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            marginRight: '5px',
            borderRadius: '4px'
        };
        return (
            <div className="field">
                {this.props.label ? <label>{ this.props.label }</label> : ''}
                <div style={ containerStyle }>
                    <AddButton
                        onClick={ this.handleClick }
                        style={ addButtonStyle }
                    />
                    <div style={ itemStyle }>

                    </div>
                </div>
            </div>
        );
    }
}

export default Field;
