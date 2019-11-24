import React, {Component} from 'react';
import ParameterComponent from './parameterComponent';
// import GoogleMap from './googleMap';
// import GoogleMaps from './googleMap2';
// import GoogleMaps from './googleMap3'
import Map from './googleMap4'
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      result: null
    }
  }

  handleMapLoad = (map) => {
    this.setState({
      map: map
    })
  }

  render() {
    return(
      <div className="App" >
        <nav className="navbar navbar-light bg-success" > 
          <span className="navbar-brand mb-0 h1">Instago!</span>
        </nav>
        <div className="column left">
          {/* <GoogleMap/> */}
          {/* <GoogleMaps/> */}
          <div style={{width: "100%", height: "90vh"}}>
          <Map id="myMap" options={{center: { lat: 43.00, lng: -81.27 }, zoom: 11}} onMapLoad = {this.handleMapLoad}/>
          </div>  
        </div>
        <div className="column right">
          <ParameterComponent result={this.state.result}/>
        </div>
      </div>
    );
  }
}

export default App;
