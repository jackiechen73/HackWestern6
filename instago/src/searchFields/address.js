import React, {Component} from 'react';
class AddressField extends Component {
	render() {
		return(
			<div>
                <p>
                    Address: 
                </p>
				<input type="text" name="address"/>
			</div>
		);
	}
}

export default AddressField;
