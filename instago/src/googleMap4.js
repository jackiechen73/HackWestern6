import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(document.getElementById(this.props.id),this.props.options);
    this.props.onMapLoad(map)
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
    return (
      <div style={{ width: "100%", height: "100%" }} id={this.props.id} />
    );
  }
}

export default Map;