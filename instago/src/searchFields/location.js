import React, {Component} from 'react';
import Autocomplete from "react-autocomplete";
import '../styles/locationStyle.css';
import cityData from '../cityData/ca';
class LocationField extends Component {
    constructor (props) {
        super(props)
        this.state = {
          value: '',
        }
    }

    createCityData(data) {
        console.log(data.city);
        return {
            id: data.city.concat(', ', data.country),
            label: data.city.concat(', ', data.country)
        }
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
        console.log(this.state.value)
    }
    //TODO: Figure out how to increase the width of the Autocomplete combobox
	render() {
		return(
            <div>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text">Destination</span>
                    </div>
                    <input type="text" className="form-control" onChange={this.onChange} text={this.state.value}/>
                </div>
                {/* <Autocomplete
                    items={cityData.map(data => this.createCityData(data))}

                    //TODO: Reword shouldItemRender method
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                    <div
                        //class='location-dropdown'
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                    >
                        {item.label}
                    </div>
                    }
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={value => this.setState({ value })}
                /> */}
            </div>
		);
	}
}

export default LocationField;
