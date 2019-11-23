import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class EndDateField extends Component {
	state = {
        startDate: new Date(),
        endDateField: new Date()
    };
    
    
    handleChange = date => {
        date >= this.state.startDateField ? (
        this.setState({
            startDate: date,
            endDateField: date
        })) : console.log(date + this.state.startDateField);
    };
    
    render() {
        return (
            <div>
                {this.props.message}
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default EndDateField;
