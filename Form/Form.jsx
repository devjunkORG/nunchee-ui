/* global $ */
import React from 'react';
import _ from 'lodash';

import Fields from './Fields';
import Input from './Input';
import Select from './Select';
import ColorPicker from './ColorPicker';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import File from './File';
import List from './List';
import FileMeta from './FileMeta';
import RichEditor from './RichEditor';
import ajax from 'superagent';
import classNames from 'classnames';

class Form extends React.Component {

    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }
    /*
        @TODO: Allow construction of forms with field groups from JSON, so modules
        don't have to be loaded twice
    */
    componentDidMount() {
        let formOptions = {
            fields: { }
        };
        formOptions.onSuccess = (e,fields) => {
            e.preventDefault();

            let action;
            if (this.props.options &&
                this.props.options.setup &&
                this.props.options.setup.action) {
                action = this.props.options.setup.action;
            } else {
                action = this.props.action || '';
            }
            if (action.length < 1) {
                return false;
            }
            this.submit(null,action,fields);
        };
        formOptions.onFailure = (e) => {
            e.preventDefault();
        };
        if (!this.props.options || !this.props.options.fields) {
            return $(this._form).form(formOptions);
        }
        for (let i in this.props.options.fields) {
            let current = this.props.options.fields[i];
            if (current.rules) {
                /*
                Ignore 'empty' (required) rule when method is PUT,
                since editing doesn't work properly if all fields are required
                */
                if (this.props.options.setup.method === 'PUT') {
                    current.rules = _.difference(current.rules,['empty']);
                }
                formOptions.fields[current.name] = current.rules;
            }
        }
        $(this._form).form(formOptions);
    }

    submit(e,action,fields) {
        if (this.props.onSubmit) {
            return this.props.onSubmit(e,action,fields);
        }
        let req = ajax.post(action);
        req.send(fields);
        req.end((err,res) => {
            if (err || !res.ok) {
                throw new Error(err);
            }
            $('.ui.modal').modal('hide'); // @TODO: decouple
            if (this.props.onResponse) {
                this.props.onResponse(res);
            }
        });
    }

    render() {
        let formClasses = classNames({
            ui: true,
            form: true,
            equal: this.props.equalWidth,
            width: this.props.equalWidth
        });
        // if no options or fields are given, return basic form
        if (!this.props.options || !this.props.options.fields) {
            return (
                <form
                    ref={form => { this._form = form; }}
                    className={ formClasses }
                    {...this.props}
                >
                    {this.props.children}
                </form>
            );
        }
        let elements = [];
        // Create array of elements as per options passed from parent.

        for (let i in this.props.options.fields) {
            let element = this.props.options.fields[i];
            switch(element.type) {
            case 'text':
                elements.push(<Input key={i} {...element} />);
                break;
            case 'password':
                elements.push(<Input key={i} {...element} />);
                break;
            case 'select':
                elements.push(<Select key={i} {...element} />);
                break;
            case 'color-picker':
                elements.push(<ColorPicker key={i} {...element} />);
                break;
            case 'textarea':
                elements.push(<Textarea key={i} {...element} />);
                break;
            case 'hidden':
                elements.push(<input key={i} type="hidden" {...element} />);
                break;
            }
        }
        return (
            <form
                ref={form => { this._form = form; }}
                action={this.props.options.setup.action}
                className={ formClasses }
            >
                <input
                    type="hidden"
                    name="_method"
                    value={this.props.options.setup.method}
                />
                {/*
                    @TODO: define if children should come before or after the
                    elements defined through the options prop
                */}

                {this.props.children}

                {/* render all elements on array */}

                {elements}
            </form>
        );
    }
}

export {
    Form,
    Input,
    Select,
    Fields,
    ColorPicker,
    Textarea,
    Checkbox,
    File,
    List,
    FileMeta,
    RichEditor
};
export default Form;
