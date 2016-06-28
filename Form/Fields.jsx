import React from 'react';
import num2word from 'num-to-word';
import classNames from 'classnames';

class Fields extends React.Component {

    constructor(props) {
        super(props);
    }
    /*

     @TODO: Very Important - Rethink all components that could potentially be
     children of this (Fields) component, because right now it's creating
     .field elements that are children of other .field elements, which
     creates a lot of overhead when rendered (lots of unnecessary html
     containers)

     */
    render() {
        let moreThanOne =  (
            this.props.children &&
            this.props.children instanceof Array &&
            this.props.children.length > 1
        ) ? true : false;

        let classes = {
            fields: moreThanOne,
            field: !moreThanOne
        };

        let fieldClasses = {};
        let count;

        if (this.props.children) {
            count = this.props.count || (this.props.children.length || 1);
        }

        fieldClasses[num2word(16/count)] = true;
        fieldClasses['wide'] = true;

        fieldClasses['field'] = true;
        fieldClasses = classNames(fieldClasses);

        classes = classNames(classes);

        return (
            <div className={ classes } {...this.props}>
                {
                    moreThanOne ?
                    this.props.children.map((child,k) => {
                        if (child.props.noField) {
                            return (child);
                        }
                        return (
                            <div key={k} className={ fieldClasses }>
                                {child}
                            </div>
                        );
                    }) : <div>{this.props.children}</div>
                }
            </div>
        );
    }
}

Fields.defaultProps = {
    count: 1
};

export default Fields;
