import React, { Component } from 'react';
import icon1 from './icons/icon1.png';
import icon2 from './icons/icon2.png';
import icon3 from './icons/icon3.png';
import icon4 from './icons/icon4.png';
import icon5 from './icons/icon5.png';

class Map extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
	}

	setMarkers(map) {
		if (this.props.hotel) {
			const icons = [icon1, icon2, icon3, icon4, icon5];
			for (let i = 0; i < this.props.attractions.length; i++) {
				var newMarker = new window.google.maps.Marker({
					position: {lat: this.props.attractions[i].lat, lng: this.props.attractions[i].long},
					map: map,
					icon: icons[i]
				});
			}
		} 
	}

	onScriptLoad() {
		const map = new window.google.maps.Map(document.getElementById(this.props.id),this.props.options);
		this.setState({map: map});
		let directionsRenderer = new window.google.maps.DirectionsRenderer();
		directionsRenderer.setMap(map);
		
		this.props.onMapLoad(map, directionsRenderer);
	}

	componentDidMount() {
		if (!window.google) {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://maps.google.com/maps/api/js?key=AIzaSyDMUPKgBpm5daZaNtE6CIe92xWHWFoiX64`;
			script.id = 'googleMaps';
			document.body.appendChild(script);
			script.addEventListener('load', e => {
				this.onScriptLoad()
			})
		} 
		else {
			this.onScriptLoad()
		}
	}

	render() {
		this.setMarkers(this.state ? this.state.map : null);
		return (
			<div style={{ width: "100%", height: "100%" }} id={this.props.id} />
		);
	}
}

export default Map;