import React from 'react';
import Editor from 'draft-wysiwyg';
import { Blocks } from './draft/index.js';
//import { Draft, Data, Blocks } from 'draft-wysiwyg';

class RichEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
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
        return (
            <Editor {...this.props} blockTypes={ Blocks }></Editor>
        );
    }
}

export default RichEditor;
