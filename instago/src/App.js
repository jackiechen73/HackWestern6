import React, {Component} from 'react';
import logo from './logo.svg';
import LocationField from './searchFields/location';
import AddressField from './searchFields/address';
import DateField from './searchFields/date';
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './App.css';
import $ from 'jquery';

class App extends Component {
  
  render() {
    return(
      <div className="App">
        <div>
          <LocationField/>
        </div>
        {/* <div>
          <DateField message='start date'/>
        </div> */}
      </div>
    );
  }
}

export default App;
