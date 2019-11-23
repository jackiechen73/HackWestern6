import React, {Component} from 'react';
import ParameterComponent from './parameterComponent';
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './App.css';

class App extends Component {
  
  render() {
    return(
      <div class="App" >
        <ParameterComponent/>
      </div>
    );
  }
}

export default App;
