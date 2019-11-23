import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
//import Alert from 'react-alert';
import calendar from '../icons/calendar.svg';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/dateStyles.css';

class StartDateField extends Component {
	state = {
        startDate: new Date(),
        startDateField: new Date(),
        endDateField: new Date()
    };

    //TODO: Make error display instead of log on console
    showError = message  => {
        console.log(message);
    };
    
    handleChangeStart = date => {
        date <= this.state.endDateField ?
        this.setState({
            startDate: date,
            startDateField: date
        }) : this.showError('Starting date must be before ending date');
    };

    handleChangeEnd = date => {
        date >= this.state.startDateField ?
        this.setState({
            startDate: date,
            endDateField: date
        }) : this.showError('Ending date must be after starting date');
    };
    
    render() {
        return (
            <div>                
                <div>
                    <p className="date-label">Start Date:</p>
                    <img className='calendar-image' src={calendar} alt="calendar"/>
                    <DatePicker
                        selected={this.state.startDateField}
                        onChange={this.handleChangeStart}
                    />
                </div>
                <br/>
                <div>
                    <p className="date-label">End Date:</p>
                    <img className='calendar-image' src={calendar} alt="calendar"/>
                    <DatePicker
                        selected={this.state.endDateField}
                        onChange={this.handleChangeEnd}
                    />
                </div>
            </div>
        );
    }
}

export default StartDateField;
