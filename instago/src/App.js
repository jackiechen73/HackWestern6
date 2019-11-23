import React, {Component} from 'react';
import ParameterComponent from './parameterComponent';
// import GoogleMap from './googleMap';
// import GoogleMaps from './googleMap2';
import GoogleMaps from './googleMap3'
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return(
      <div className="App" >
        <nav className="navbar navbar-light bg-success" > 
          <span className="navbar-brand mb-0 h1">Instago!</span>
        </nav>
        <div className="column left">
          {/* <GoogleMap/> */}
          <GoogleMaps/>
        </div>
        <div className="column right">
          <ParameterComponent/>
        </div>GoogleMap
      </div>
    );
  }
}

export default App;
