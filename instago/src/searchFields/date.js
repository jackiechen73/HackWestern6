import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class DateField extends Component {
	state = {
        startDate: new Date()
    };
    
    handleChange = date => {
        this.setState({
            startDate: date
        });
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

export default DateField;
