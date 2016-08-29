/* global $ */
import React from 'react';
import classNames from 'classnames';

class Confirm extends React.Component {

    constructor(props) {
        super(props);
        this.modalOk = this.modalOk.bind(this);
        this.modalCancel = this.modalCancel.bind(this);
    }

    componentDidMount() {
        //this.forceUpdate();
        let options = {
            onApprove: this.props.onConfirm ? this.props.onConfirm : () => true,
            onDeny: () => false,
            allowMultiple: true
        };
        $(this._modal)
        .modal(options)
        .modal('show');
    }

    modalOk() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    modalCancel() {
        $(this._modal).modal('hide');
    }

    render() {
        let classes = classNames({
            ui: true,
            modal: true,
            test: this.props.test || false
        });
        return (
            <div ref={modal => { this._modal = modal; }} className={ classes }>
                <i className="close icon"></i>
                <div className="header">
                    Confirmar
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="actions">
                    <div className="ui blue button ok">Aceptar</div>
                    <div className="ui basic red button cancel">Cancelar</div>
                </div>
            </div>
        );
    }
}

export default Confirm;
