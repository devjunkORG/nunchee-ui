import React from 'react';
import { Editor, EditorState } from 'draft-js';

//<Editor className="rich input" placeholder={ this.props.placeholder } editorState={editorState} onChange={this.onChange} suppressContentEditableWarning />

class Textarea extends React.Component {

    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => this.setState({editorState});
    }

    render() {
        const { editorState } = this.state;
        if (this.props.rich) {
            return (
                <div className="rich textarea field">
                    <label>{ this.props.label }</label>
                    <Editor defaultValue={this.props.defaultValue} editorState={editorState} onChange={this.onChange} />
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
