import React, {Component} from 'react';
import LocationField from './searchFields/location';
import AddressField from './searchFields/address';
import DateField from './searchFields/date';
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './styles/parameterStyles.css';

class ParameterComponent extends Component {
  
  constructor() {
    super()
    this.state = {
      dest: "",
      length: 1
    }
  }

  onChangeDest = (e) => {
    this.setState({
      dest: e.target.dest
    })
  }
  
  onChangeLength = (e) => {
    this.setState({
      length: e.target.length
    })
  }

  planTrip = (e) => {
    console.log("click")
    const LINK = "https://xenown.api.stdlib.com/plan-trip@0.0.3/";
    fetch(LINK, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        destination: this.state.dest,
        days: this.state.length,
        name: "Test"
      })
    }).then((res) => {
      console.log(res.json());
      console.log("Complete")
    });
    
  }

  render() {
    return(
      <div className='parameter-component'>
        <div className="container">
          <div className="row">
            <div className="col-10">
              <div className="row">
                {/* <div className='location-component'>
                  <LocationField/>  
                </div> */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text">Destination</span>
                    </div>
                    <input type="text" className="form-control" onChange={this.onChangeDest} text={this.state.dest}/>
                </div>
              </div>
              <div className="row">
              <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text">Length of Trip (Days)</span>
                    </div>
                    <input type="number" className="form-control" onChange={this.onChangeLength} text={this.state.length}/>
                </div>
              </div>
            </div>
            <div className="col-2">
              <button className="btn btn-success" onClick={this.planTrip}>Plan!</button>
            </div>
          </div>
        </div>
        {/* <div className='address-component'>
          <AddressField/>
        </div> */}
        {/* <div className='date-component'>
          <DateField/>
        </div> */}
        <br/>
        
      </div>
    );
  }
}

export default ParameterComponent;
