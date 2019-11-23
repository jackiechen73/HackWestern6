import React, { Component } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

class GoogleMaps extends Component {

    constructor() {
        super();
        this.state = {
            response: null,
            travelMode: 'DRIVING',
            origin: '',
            destination: ''
        }
    }

    directionsCallback = (response) => {
        console.log(response)
    
        if (response !== null) {
          if (response.status === 'OK') {
            this.setState(
              () => ({
                response
              })
            )
          } else {
            console.log('response: ', response)
          }
        }
      }

    render() {
        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyDMUPKgBpm5daZaNtE6CIe92xWHWFoiX64"
            >
                <GoogleMap
                    id='map'
                    mapContainerStyle={{
                        height: '90vm',
                        width: '100%'
                    }}
                    zoom={11}
                    center={{
                        lat: 43.00,
                        lng: -81.27
                    }}
                    // optional
                    onClick={this.onMapClick}
                    // optional
                    onLoad={map => {
                        console.log('DirectionsRenderer onLoad map: ', map)
                    }}
                    // optional
                    onUnmount={map => {
                        console.log('DirectionsRenderer onUnmount map: ', map)
                    }}
                >
                    {/* {
                        (
                            this.state.destination !== '' && this.state.origin !== ''
                        ) && (
                            <DirectionsService
                                // required
                                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                                    destination: this.state.destination,
                                    origin: this.state.origin,
                                    travelMode: this.state.travelMode
                                }}
                                // required
                                callback={this.directionsCallback}
                                // optional
                                onLoad={directionsService => {
                                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                            npx eslint --init    }}
                                // optional
                                onUnmount={directionsService => {
                                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                                }}
                            />
                        )
                    }

                    {
                        this.state.response !== null && (
                            <DirectionsRenderer
                                // required
                                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                                    directions: this.state.response
                                }}
                                // optional
                                onLoad={directionsRenderer => {
                                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                }}
                                // optional
                                onUnmount={directionsRenderer => {
                                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                }}
                            />
                        )
                    } */}


                </GoogleMap>
            </LoadScript>
        )
    }
}

export default GoogleMaps;