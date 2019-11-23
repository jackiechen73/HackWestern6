import React, {Component} from 'react';
import Autocomplete from "react-autocomplete";
import '../styles/locationStyle.css';
class LocationField extends Component {
    constructor (props) {
        super(props)
        this.state = {
          value: '',
        }
    }
	render() {
    const autocompleteStyle = {
        align: 'left',
        fontSize: '80%'
    }
		return(
			<Autocomplete
                menuStyle={autocompleteStyle}
                items={[
                { id: 'Vancouver, British Columbia', label: 'Vancouver, British Columbia' },
                { id: 'San Francisco, California', label: 'San Francisco, California' },
                { id: 'Toronto, Ontario', label: 'Toronto, Ontario' },
                ]}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={(item, highlighted) =>
                <div
                    //class='location-dropdown'
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                    align='left'
                >
                    {item.label}
                </div>
                }
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
            />
		);
	}
}

export default LocationField;
