/* global $ */
import React from 'react';
import classNames from 'classnames';
import { isObject, isString } from 'lodash';
const _ = {
    isObject: isObject,
    isString: isString
};

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.destroyModal = this.destroyModal.bind(this);
        this.modalOk = this.modalOk.bind(this);
        this.modalCancel = this.modalCancel.bind(this);
    }

    componentDidMount() {
        //this.forceUpdate();
        let options = {
            onHidden: this.destroyModal,
            allowMultiple: this.props.options.allowMultiple || true,
            closable: false
        };
        if (this.props.options) {
            for (let i in this.props.options) {
                options[i] = this.props.options[i];
            }
        }
        if (this.props.closeParent) {
            const parent = this.props.closeParent;
            let selector;
            if (_.isObject(parent)) {
                selector = parent._modal;
            }
            if (_.isString(parent)) {
                selector = parent;
            }
            if (selector) {
                $(selector).modal('hide');
            }
        }
        $(this._modal)
        .modal(options)
        .modal('show');
    }

    componentWillMount() {
        if (this.props.options && this.props.options.firstLevel) {
            $('.ui.modal').modal('hide');
        }
    }

    modalOk() {
        let forms = $(this._modal).find('form');
        let hasForm = (forms.length > 0);
        if (hasForm) {
            return $(forms[0]).form('validate form');
        }
        // if (_.find(this.props.options,{ closable: false })) {
        //     return false;
        // }

    }

    componentDidUpdate() {
        // if (!this.props.open) {
        //     this.modalCancel();
        // }
    }

    modalCancel() {
        $(this._modal).modal('hide');
    }

    destroyModal() {
        const parent = this.props.closeParent;
        let selector;
        if (_.isObject(parent)) {
            selector = parent._modal;
        }
        if (_.isString(parent)) {
            selector = parent;
        }
        if (selector) {
            $(selector).modal('show');
        }
        // $(this._modal).remove();
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
                    {this.props.options.title || ''}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="actions">
                    <div className="ui blue button ok" onClick={ this.modalOk }>{ this.props.options.acceptText || 'Aceptar' }</div>
                    <div className="ui basic red button cancel" onClick={ this.modalCancel }>{ this.props.options.cancelText || 'Cancelar' }</div>
                </div>
            </div>
        );
    }
}

export default Modal;
