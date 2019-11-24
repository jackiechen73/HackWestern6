import React, {Component} from 'react';
import ParameterComponent from './parameterComponent';
import GoogleMap from './googleMap';
// import GoogleMaps from './googleMap2';
// import GoogleMaps from './googleMap3'
import Map from './googleMap4'
// import {BrowserRouter as Router, Route, Link} from 'react-dom';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      map: null,
      directionsRenderer: null,
      directionsService: null
    }
  }

  handleMapLoad = (map) => {
    this.setState({
      map: map,
      directionsRenderer: new window.google.maps.DirectionsRenderer(),
      directionsService: new window.google.maps.DirectionsService()
    })
  }

  setMap = (result, source) => {
    console.log(result)
    console.log(source)
    let locations = [];
    for (let i = 0; i < result.length; i++){
      locations.push({location: result[i]["address"], stopover: false});
    }
    // const googleDirections = "https://maps.googleapis.com/maps/api/directions/json"
    //  + "?origin=" + source["name"]
    //  + "&destination=" + source["name"]
    //  + "&mode=" + "driving"
    //  + "&language=en"
    //  + "&waypoints=" + locations
    //  + "&key=" + "AIzaSyDMUPKgBpm5daZaNtE6CIe92xWHWFoiX64";
    //  fetch(googleDirections, {
    //   method: "POST",
    //   mode: "cors",
    //   cache: "no-cache",
    //   headers: {
    //     "Content-type": "application/json"
    //   }
    // }).then((res) => {
    //   res.json().then((data) => {
    //     this.setState({
    //       res: data
    //     })
    //     console.log(data);
    //     console.log("Complete");
    //   })
    // });
    let request = {
      origin: source["name"],
      destination: source["name"],
      travelMode: 'DRIVING',
      waypoints: locations
    };
    this.state.directionsService.route(request, function(result, status) {
      console.log(result)
      if (status === 'OK') {
        let directionsRenderer = new window.google.maps.DirectionsRenderer(); 
        directionsRenderer.setDirections(result);
      }
    });
    
    // var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    // var mapOptions = {
    //   zoom:7,
    //   center: chicago
    // }
    // var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // directionsRenderer.setMap(map);
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
          <ParameterComponent callBack={this.setMap}/>
        </div>
      </div>
    );
  }
}

export default App;
