import React from 'react';
import { Blocks } from './draft/index.js';
import Editor from 'draft-wysiwyg';
import { isEmpty } from 'lodash';
const _ = {
    isEmpty: isEmpty
};

//<Editor className="rich input" placeholder={ this.props.placeholder } editorState={editorState} onChange={this.onChange} suppressContentEditableWarning />

class Textarea extends React.Component {

    constructor(props) {
        super(props);
        this.focusRichEditor = this.focusRichEditor.bind(this);
    }

    componentWillMount() {
        this.state = { value : null };
    }

    componentDidMount() {
        if (_.isEmpty(this.props.value)) {
            this.setState({ value: null });
        }
    }

    focusRichEditor() {
        this._editor.focus();
    }

    blockStyle(contentBlock) {
        const type = contentBlock.getType();
        switch(type) {
        case 'header-1':
            return 'h1';
        case 'header-2':
            return 'h2';
        case 'header-3':
            return 'h3';
        case 'header-4':
            return 'h4';
        }
    }

    render() {
        let editorState = !_.isEmpty(this.props.editorState) ? this.props.editorState : null;
        if (this.props.rich) {
            return (
                <div onClick={ this.focusRichEditor } className="rich textarea field">
                    <label>{ this.props.label }</label>
                    <Editor
                        ref={ editor => this._editor = editor }
                        value={ editorState }
                        {...this.props}
                        blockTypes={ Blocks }>
                    </Editor>
                </div>
            );
        } else {
            return (
                <div className="textarea field">
                    <label>{ this.props.label }</label>
                    <textarea name="description" defaultValue={this.props.defaultValue.original}></textarea>
                </div>
            );
        }
    }
}

Textarea.propTypes = {
    rich: React.PropTypes.bool,
    defaultValue: React.PropTypes.object
};
Textarea.defaultProps = {
    rich: false,
    defaultValue: {
        original: ''
    }
};

export default Textarea;
