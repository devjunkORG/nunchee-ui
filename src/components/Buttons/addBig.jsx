import React from 'react';
import { forIn } from 'lodash';
const _ = {
    forIn: forIn
};

class addBig extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let elementStyle = {
            color: '#d6d6d6',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
        };
        let buttonStyle = {
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            height: '80px',
            backgroundColor: '#00b7c0',
            marginRight: '10px',
            opacity: '0.8',
            color: '#ffffff',
            boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.25)'
        };
        if (this.props.style) {
            _.forIn(this.props.style,(value,key) => {
                buttonStyle[key] = value;
            });
        }
        return (
            <a href="#" style={ elementStyle } onClick={ this.props.onClick } >
                <div style={ buttonStyle }>
                    <i className="fa fa-plus icon"></i>
                </div>
                {this.props.children}
            </a>
        );
    }
}

export default addBig;
