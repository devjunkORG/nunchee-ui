import React from 'react';

class Item extends React.Component {

    render() {
        return (
            <div className="item">
                <img src={this.props.thumb} width="80px" height="80px" />
                <h4>{this.props.children}</h4>
                <h5>{this.props.subtitle}</h5>
            </div>
        );
    }
}

export default Item;
