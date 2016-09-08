import React from 'react';
import AddButton from '../Buttons/addBig';
import sha1 from 'sha1';
import { isArray, isString, isObject, isEmpty, find, without, clone } from 'lodash';
const _ = {
    isArray: isArray,
    isString: isString,
    isObject: isObject,
    isEmpty: isEmpty,
    find: find,
    without: without,
    clone: clone
};

class File extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.processUpload = this.processUpload.bind(this);
        this.addFile = this.addFile.bind(this);
        this.editFile = this.editFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.removeDefault = this.removeDefault.bind(this);
    }

    initialize() {
        let defaultValue = [];
        if (this.props.defaultValue && (_.isString(this.props.defaultValue) || _.isObject(this.props.defaultValue))) {
            defaultValue = [ this.props.defaultValue ];
        }
        if (this.props.defaultValue && _.isArray(this.props.defaultValue)) {
            defaultValue = this.props.defaultValue;
        }
        return {
            files: [],
            defaultValue: defaultValue
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

    removeDefault(item,e) {
        e.preventDefault();
        let files = _.clone(this.state.defaulValue);
        this.setState({ defaultValue: _.without(files,item)});
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
            if (this.props.multiple && noTrigger !== true) {
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
            left: 0,
            bottom: 0,
            height: 80,
            width: 80,
            cursor: 'pointer',
            zIndex: 9999
        };
        let defaultFiles = this.state.defaultValue.map((file,key) => {
            let itemStyle = {
                height: '80px',
                width: '80px',
                marginRight: '5px',
                borderRadius: '4px',
                backgroundSize: 'cover',
                backgroundImage: _.isObject(file) ? `url(${file.url})` : `url(${file})`
            };
            return (
                <div key={key} className="item file upload" style={ itemStyle }>
                    {_.isObject(file) ? <input type="hidden" value={ file._id } name={ `${this.props.name}` } /> : '' }
                    <div className="file settings">
                        <button className="close button" onClick={ this.removeDefault.bind(this,file) }><i className="close icon"></i></button>
                    </div>
                </div>
            );
        });
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
                    {defaultFiles}
                    {this.props.multiple ? '' : (!_.isEmpty(file) ? <input type="hidden" name={ `${this.props.name}` } value={ file.url || file._id } /> : '') }
                    {this.state.files.map((item,key) => {
                        let itemStyle = {
                            height: '80px',
                            width: '80px',
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
File.defaultProps = {
    defaultValue: []
};

export default File;
