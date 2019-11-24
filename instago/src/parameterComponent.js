import React, {Component} from 'react';
import LocationField from './searchFields/location';
import AddressField from './searchFields/address';
import DateField from './searchFields/date';
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './styles/parameterStyles.css';

class ParameterComponent extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      dest: "",
      length: 1,
      res: null,
      disabled: true
    }
  }

  onChangeDest = (e) => {
    this.setState({
      dest: e.target.value
    }, () => {
      this.setState({
          disabled: !(this.state.dest !== "" && this.state.length !== 0 && this.state.length !== null)
      })
    });
  }
  
  onChangeLength = (e) => {
    this.setState({
      length: e.target.value
    }, () => {
      this.setState({
        disabled: !(this.state.dest !== "" && this.state.length !== 0 && this.state.length !== null)
      })
    });
  }

  planTrip = (e) => {
    let LINK = "https://xenown.api.stdlib.com/plan-trip@0.0.5/?destination=" + this.state.dest + "&days=" + this.state.length;
    fetch(LINK, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => {
      res.json().then((data) => {
        this.setState({
          res: data
        })
        this.props.callBack(data.topChoices, data.hotel);
        console.log(data);
        console.log("Complete");
      })
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
                    <input type="text" className="form-control" onChange={this.onChangeDest} value={this.state.dest}/>
                </div>
              </div>
              <div className="row">
              <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text">Length of Trip (Days)</span>
                    </div>
                    <input type="number" className="form-control" onChange={this.onChangeLength} value={this.state.length}></input>
                </div>
              </div>
            </div>
            <div className="col-2">
              <button className={`btn btn-success btn-block ${this.state.disabled ? "disabled" : ""}`} onClick={this.planTrip}>Plan!</button>
            </div>
          </div>
          {this.state.res !== null ?
            <div className="row"> 
              <div className="col">
                <div className="row">
                  <h5>{this.state.res.hotel.name}</h5>
                  <h5>{this.state.res.hotel.address}</h5>
                </div>
                <div className="row">
                  {this.state.res.topChoices.map(
                    (choice, i) => (
                    <div className="ex1 card" key={i}>
                      <div className="container">
                          <h5>{choice.name}</h5>
                          {choice.address}
                          <br/>
                          Rating: {choice.rating}
                      </div>
                    </div>
                    )
                  )}
                </div>
              </div>
            </div>
            : <div className="row"></div>
          }
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
