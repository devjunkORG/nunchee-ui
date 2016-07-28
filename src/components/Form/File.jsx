import React from 'react';
import AddButton from '../Buttons/addBig';
import sha1 from 'sha1';
import _ from 'lodash';

class File extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.processUpload = this.processUpload.bind(this);
        this.addFile = this.addFile.bind(this);
        this.editFile = this.editFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
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
    }

    removeFile(item,e) {
        e.preventDefault();
        this._fileInput.value = null;
        let files = this.state.files;
        files = _.without(files,_.find(files,item));
        this.setState({ files: files });
    }

    editFile(item,e) {
        e.preventDefault();
        if (this.props.onEdit) {
            return this.props.onEdit(item,e);
        }
    }

    processUpload(e) {
        if (e.target.files && e.target.files.length > 0) {
            this.addFile(e.target.files[0]);
        }
    }

    addFile(file,noTrigger) {
        const reader = new FileReader();
        const createFile = (event,file) => {
            let files = this.state.files;
            let data = {
                id: sha1(`${file.name}${file.size}${event.target.result}`),
                name: file.name,
                size: file.size,
                url: event.target.result
            };
            if (this.props.multiple) {
                files.push(data);
                if (this.props.onChange) {
                    this.props.onChange(files);
                }
                return this.setState({ files: files });
            }
            if (this.props.onChange && noTrigger !== true) {
                this.props.onChange(data);
            }
            return this.setState({ files: [ data ]});
        };
        reader.onload = (file => {
            return function(e) {
                createFile(e,file);
            };
        })(file);
        reader.readAsDataURL(file);
    }

    componentDidUpdate() {
        if (this.props.onUpdate && this.state.files.length > 0) {
            this.props.onUpdate(this.state.files);
        }
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
        let file = this.state.files.length > 0 ? this.state.files[0] : '';
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
                    {this.props.multiple ? '' : <input type="hidden" name={ `${this.props.name}` } value={ file.url || '' } /> }
                    {this.state.files.map((item,key) => {
                        let itemStyle = {
                            height: '80px',
                            width: '80px',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            marginRight: '5px',
                            borderRadius: '4px',
                            backgroundSize: 'cover',
                            backgroundImage: item.url ? `url(${item.url})` : ''
                        };
                        return <div key={ key } className="item file upload" style={ itemStyle }>
                            {this.props.multiple ? <input type="hidden" readOnly name={ `${this.props.name}[]` } value={item.url} /> : '' }
                            <div className="file settings">
                                <button className="close button" onClick={ this.removeFile.bind(this,item) }><i className="close icon"></i></button>
                                <button className="edit button" onClick={ this.editFile.bind(this,item) }><i className="icon-write icon"></i></button>
                            </div>
                        </div>;
                    })}
                </div>
            </div>
        );
    }
}

export default File;
