import ReactCalendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';

import React from 'react';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.getCalendarContainer = this.getCalendarContainer.bind(this);
        this.openPicker = this.openPicker.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.state = {
            calendarOpen: false
        };
    }

    openPicker() {
        this.setState({ calendarOpen: true });
    }
    closePicker() {
        this.setState({ calendarOpen: false });
    }
    getCalendarContainer() {
        return this._calendar || document.getElementById('calendarContainer');
    }

    componentDidMount() {

    }

    render() {
        const dateFormatter = new DateTimeFormat('dd-MM-yyyy');
        const defaultValue = this.props.defaultValue;
        return (
            <div className="field">
                <div ref={ calContainer => { this._calendar = calContainer; }}
                    style={
                        {
                            display: this.state.calendarOpen ? 'block' : 'none',
                            position: 'fixed',
                            zIndex: 9999
                        }
                    }
                    noField>
                </div>
                {this.props.label ? <label>{this.props.label}</label> : ''}
                <DatePicker calendar={<ReactCalendar />}
                    getCalendarContainer={this.getCalendarContainer}
                    onOpen={ this.openPicker }
                    onClose={ this.closePicker }
                    label={ this.props.label }
                    style={ { top: '21px', cursor: 'text' } }>
                    {
                      ({ value }) => {
                          return (
                            <span>
                            <input
                              readOnly
                              value={value && dateFormatter.format(value) || defaultValue && moment(defaultValue).format('DD-MM-YYYY')}
                              style={ { cursor: 'text' } }
                            />
                            </span>
                        );
                      }
                    }
                </DatePicker>
            </div>
        );
    }
}

Calendar.propTypes = {
    defaultValue: React.PropTypes.string
};
Calendar.defaultProps = {
    defaultValue: ''
};


export default Calendar;
