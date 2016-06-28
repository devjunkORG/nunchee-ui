import React, {Component, PropTypes} from "react";
import { FocusDecorator } from 'draft-js-focus-plugin';
import { DraggableDecorator } from 'draft-js-dnd-plugin';
import { ToolbarDecorator } from 'draft-js-toolbar-plugin';
import { AlignmentDecorator } from 'draft-js-alignment-plugin';
import { ResizeableDecorator } from 'draft-js-resizeable-plugin';

class Div extends Component {
   render(){
      const { style, className } = this.props;
      var styles = {
         backgroundColor: 'rgba(100, 100, 100, 1.0)',
         width: '100%',
         height: '100%',
         textAlign: 'center',
         color: 'white',
         zIndex: 1,
         position: 'relative'
      };
      return (
         <div style={styles} className={className} contentEditable={false}>
            Horizontal only
            {/*<Toolbar active={this.props.active} parent={"#"+this.props.uniqueId} actions={this.props.actions}/>*/}
         </div>
      );
   }
}
export default ResizeableDecorator({
   handles: true
})(
  DraggableDecorator(
    FocusDecorator(
      AlignmentDecorator(
        ToolbarDecorator()(
          Div
        )
      )
    )
  )
);
