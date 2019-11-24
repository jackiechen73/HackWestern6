import React, {Component} from 'react';
import ParameterComponent from './parameterComponent';
import instaLogo from './icons/instaLogoGreen.png';
import Map from './googleMap'
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

	handleMapLoad = (map, a) => {
		this.setState({
			map: map,
			directionsRenderer: a,
			directionsService: new window.google.maps.DirectionsService()
		})
	}

	callBack = (result, status) => {
		console.log(result)
		if (status === 'OK') {
			//let directionsRenderer = new window.google.maps.DirectionsRenderer(); 
			this.state.directionsRenderer.setDirections(result);
		}
	};

	setMap = (result, source) => {
		console.log(result)
		console.log(source)
		this.setState({
			hotel: source,
			attractions: result
		})
		let locations = [];
		for (let i = 0; i < result.length; i++){
			locations.push({location: result[i]["address"], stopover: false});
		}

		let request = {
			origin: source["name"],
			destination: source["name"],
			travelMode: 'DRIVING',
			waypoints: locations
		};
		
		this.state.directionsService.route(request, this.callBack);
	}

	render() {
		return(
			<div className="App" >
				<nav className="navbar navbar-light bg-success" > 
					<span className="navbar-brand mb-0 h1">
						<img src={instaLogo} alt='instago logo' height='40px' width='50%'/>
					</span>
				</nav>
				<div className="column left">
					<div style={{width: "100%", height: "90vh"}}>
					<Map id="myMap"
					options={{center: { lat: 43.00, lng: -81.27 }, zoom: 11}}
					onMapLoad = {this.handleMapLoad}
					hotel={this.state.hotel}
					attractions={this.state.attractions}/>
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
