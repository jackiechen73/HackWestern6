import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 43.00,
      lng: -81.27
    },
    zoom: 11
    // 43°00'34.1"N 81°16'25.6"W
  };

  handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDMUPKgBpm5daZaNtE6CIe92xWHWFoiX64" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GoogleMap;