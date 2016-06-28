import React from 'react';
import { SketchPicker } from 'react-color';
import classNames from 'classnames';

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.setOption = this.setOption.bind(this);
        this.togglePicker = this.togglePicker.bind(this);
        this.setColor = this.setColor.bind(this);
        this.state = this.initialize();
    }

    initialize() {
        return {
            displayPicker: false
        };
    }

    setOption() {
        // set selected option on hidden input @TODO
    }

    togglePicker() {
        return this.setState({ displayPicker: !this.state.displayPicker });
    }

    setColor(color) {
        console.log(color);
        $('.custom').css({ backgroundColor: `${color.hex}` });
        $(`[name=${this.props.name}]`).val(color.hex);
    }

    componentDidMount() {
        $('body').on('click.colorPicker',() => {
            this.setState({ displayPicker: false });
        });
        $('body').on('click.colorPicker','.closeOnClickOut',(e) => {
            e.stopPropagation();
        });
        $('body').on('click.colorPicker','.custom', (e) => {
            if (this.state.displayPicker) {
                e.stopPropagation();
            }
        });
    }

    componentWillUnmount() {
        // turn off .colorPicker events on unmount
        $('body').off('.colorPicker');
    }

    render() {
        return (
            <div className="field">
                <label>{this.props.label}</label>
                <div className="colorpicker">
                    <input name={this.props.name} type="hidden" />
                    {this.props.options.map((v,i) => {
                        return (<div key={i} onClick={this.setOption} className="option" style={ { backgroundColor: v } }></div>);
                    })}
                    <div onClick={ this.togglePicker } className="custom"></div>
                    <div className={classNames({ pickercontainer: true, closeOnClickOut: true, hidden: !this.state.displayPicker })}>
                        <SketchPicker onChange={this.setColor} type="sketch" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ColorPicker;
