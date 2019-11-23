import React, {Component} from 'react';
import LocationField from './searchFields/location';
import AddressField from './searchFields/address';
import DateField from './searchFields/date';
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './styles/parameterStyles.css';

class ParameterComponent extends Component {
  
  render() {
    return(
      <div class='parameter-component'>
        <div class='location-component'>
          <LocationField/>  
        </div>
        <div class='address-component'>
          <AddressField/>
        </div>
        <div class='date-component'>
          <DateField/>
        </div>
      </div>
    );
  }
}

export default ParameterComponent;
