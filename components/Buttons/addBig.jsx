import React from 'react';
import _ from 'lodash';

class addBig extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let elementStyle = {
            color: '#d6d6d6',
            display: 'flex',
            alignItems: 'center'
        };
        let buttonStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            height: '80px',
            border: '2px dashed #d6d6d6',
            marginRight: '10px'
        };
        let textStyle = {
            padding: 0,
            margin: 0
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
