import React from 'react';

class AddItem extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a href="#" className="add item">
                <div className="plusbutton">
                    <i className="fa fa-plus icon"></i>
                </div>
                <h5>Agregar Elemento...</h5>
            </a>
        );
    }
}

export default AddItem;
