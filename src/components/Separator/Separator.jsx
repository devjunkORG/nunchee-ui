import React from 'react';

class Separator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div
                style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        height: '100%'
                    }
                }
            >
                <div style={{
                    borderBottom: `1px solid ${this.props.color}`,
                    position: 'relative',
                    marginBottom: '2rem',
                    width: '100%'
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: '45%',
                            width: this.props.size || 25,
                            height: this.props.size || 25,
                            border: this.props.circled ? `1px solid ${this.props.color}` : 'none',
                            color: this.props.color,
                            borderRadius: '100%',
                            padding: '1rem',
                            backgroundColor: this.props.backgroundColor,
                            top: '-25px'
                        }}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
Separator.propTypes = {
    children: React.PropTypes.string,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string
};
Separator.defaultProps = {
    children: 'SP',
    backgroundColor: '#fff',
    color: '#000'
};

export default Separator;
