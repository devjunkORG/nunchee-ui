import React from 'react';
import _ from 'lodash';
import AddButton from '../Buttons/addBig';

class File extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.processUpload = this.processUpload.bind(this);
        this.addFile = this.addFile.bind(this);
    }

    initialize() {
        return {
            files: []
        };
    }

    componentWillMount() {
        this.state = this.initialize();
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.onClick) {
            return this.props.onClick();
        }
        // this._fileInput.click();
    }

    processUpload(e) {
        if (e.target.files && e.target.files.length > 0) {
            this.addFile(e.target.files[0]);
        }
    }

    addFile(file) {
        let reader = new FileReader();
        reader.onload = event => {
            let files = this.state.files;
            let file = {
                name: event.target.name,
                size: event.target.size,
                url: `url(${event.target.result})`
            };
            if (this.props.multiple) {
                files.push(file);
                return this.setState({ files: files });
            }
            return this.setState({ files: [ file ]});
        };
        reader.readAsDataURL(file);
    }

    render() {
        let containerStyle = {
            display: 'flex',
            position: 'relative'
        };
        let addButtonStyle = {
            borderRadius: '4px'
        };

        let fileInputStyle = {
            position: 'absolute',
            opacity: 0,
            top: 0,
            bottom: 0,
            height: 80,
            width: 80,
            cursor: 'pointer'
        };
        return (
            <div className="field">
                {this.props.label ? <label>{ this.props.label }</label> : ''}
                <div style={ containerStyle }>
                    <AddButton
                        ref={ button => this._addButton = button }
                        onClick={ this.handleClick }
                        style={ addButtonStyle }
                    >
                    </AddButton>
                    <input
                        ref={ input => this._fileInput = input }
                        type="file"
                        name="tempFile"
                        style={ fileInputStyle }
                        onChange={ this.processUpload }
                    />
                    {this.state.files.map((item,key) => {
                        let itemStyle = {
                            height: '80px',
                            width: '80px',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            marginRight: '5px',
                            borderRadius: '4px',
                            backgroundImage: item.url
                        };
                        return <div key={ key } style={ itemStyle }>

                        </div>;
                    })}
                </div>
            </div>
        );
    }
}

export default File;
