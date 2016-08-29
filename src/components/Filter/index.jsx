/* global $ */
import React from 'react';
import classNames from 'classnames';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    componentDidMount() {
        $(this._filter).dropdown({
            onChange: this.onChange
        });
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(this.props.name,value);
        }
    }

    removeFilter() {
        $(this._filter).dropdown('set text', this.props.defaultText);
    }

    render() {
        let removeButtonClass = classNames({
            item: true,
            disabled: this.props.set
        });
        return (
            <section
                ref={ div => this._filter = div }
                className="ui floating dropdown button"
            >
                <span className="text">{ this.props.defaultText }</span>
                <div className="menu">
                    <div className="ui icon search input">
                        <i className="search icon"></i>
                        <input type="text" placeholder={ this.props.placeholder } />
                    </div>
                    <div className={ removeButtonClass } data-value="-1" onClick={ this.removeFilter }>
                        <i className="refresh icon"></i>
                        Remover Filtro
                    </div>
                    <div className="scrolling menu">
                        {this.props.filters.map((filter,k) => {
                            return (
                                <div key={k} className="item" data-value={ filter.value }>
                                    {filter.text}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

Filter.propTypes = {
    name: React.PropTypes.string,
    defaultText: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    filters: React.PropTypes.array,
    set: React.PropTypes.bool
};
Filter.defaultProps = {
    placeholder: 'Buscar',
    defaultText: 'Filtrar'
};

export default Filter;
