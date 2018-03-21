import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import States from '../../constants/States';
import { emailValidation, phoneValidation, zipCodeValidation } from '../../utility/FormValidation';
import routes from '../../constants/Routes';

import BaseComponent from '../shared/BaseComponent';

class VoterDetail extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			voterDetail:{
				city      		: '',
				state       	: '',
				address      	: '',
				birthday       	: '',
				gender      	: '',
				email       	: '',
				phone      		: '',
				zip       		: '',
			},
			isValid:{
				city      		: true,
				state       	: true,
				address      	: true,
				birthday       	: true,
				gender      	: true,
				email       	: true,
				phone      		: true,
				zip       		: true,
			}
		}
	}

	updateVoterFields(field, event) {
		const { value } = event.target;
		let fields = Object.assign({}, this.state.voterDetail);
		fields[field] = value;

		this.setState({ voterDetail: fields });

		// check if it is valid for select tag
		if ( field === "state" || field === "city" ) {
			let validation = Object.assign({}, this.state.isValid);
			validation[field] = !!value;
			this.setState({ isValid: validation });
		}
	}

	validateInput(name, value) {
		if (!value) {
			return false;
		}
		switch (name) {
			case 'email':
				return emailValidation(value);
			case 'phone':
				return phoneValidation(parseInt(value));
			case 'zip':
				return zipCodeValidation(value);
			default:
				return true;
		}
	}

	validateVoterFields(field, event) {
		let validation = Object.assign({}, this.state.isValid);
		validation[field] = this.validateInput(field, event.target.value);
		this.setState({ isValid: validation });
	}
    
    onNext = () => {
		const { voterDetail, isValid } = this.state;
		let validation = Object.assign({}, isValid);
		Object.keys(voterDetail).forEach(key => {
            validation[key] = this.validateInput(key, voterDetail[key]);
		});

		this.setState({ isValid: validation });
	};

	goBackToHomePage() {
		this.onLink(routes.login);
	}

	renderTextField = (name, label, errorText, isWholeRow = true, type='text') => {
		const width = isWholeRow ? 12 : 6;
		return (
            <div className={`form-group col-xs-${width}`}>
                <label className="pull-left" htmlFor={name}>{ label }</label>
                <input type={type} className="input-field" id={name} ref={name}
                       required="" aria-required="true"
                       onChange={this.updateVoterFields.bind(this, name)}
                       onBlur={this.validateVoterFields.bind(this, name)} />
                { !this.state.isValid[name] && <span className="pull-left">{ errorText }</span> }
            </div>
		);
	};

	renderDropdownField = (name, label, options, errorText) => {
		return (
            <div className="form-group col-xs-6">
                <label className="pull-left" htmlFor={name}>{ label }</label>
                <select className="input-field" id={name} ref={name}
                        required="" aria-required="true"
                        onChange={this.updateVoterFields.bind(this, name)}>
                    <option value="" />
                    { options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
                </select>
                { !this.state.isValid[name] && <span className="pull-left">{ errorText }</span> }
            </div>
		)
	};

	render() {
		const { makeList, currentNumber } = this.props.voter;
		const firstName = makeList['firstname' + currentNumber];
		const lastName = makeList['lastname' + currentNumber];

		// Make states array from json object
		var stateArr = [];
		Object.keys(States).forEach(function(key){
			stateArr.push(States[key]);
		})

		const notValidInput = '* Input is not valid *';
		return (
			<div className='btw-voter btw-voter-detail'>
				<button className='btn btn-primary' style={{'left': '2%', 'position': 'absolute'}}
								onClick={this.goBackToHomePage}>
						Go back
				</button>
				<div className="intro">
					<p className="intro-title">
                        { firstName + " " + lastName }
					</p>
					<p className="intro-desc">
                    	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
				<form>
					<div className="row">
						{ this.renderTextField('city', 'City *', '* City is required *', false) }
						{ this.renderDropdownField('state', 'State *', stateArr, '* State is required *') }
					</div>
					<div className="row">{ this.renderTextField('address', 'Address', notValidInput) }</div>
					<div className="row">
                        { this.renderTextField('birthday', 'Birthday', notValidInput, false, 'date') }
                        { this.renderDropdownField('gender', 'Gender', ['Male', 'Female'], notValidInput) }
					</div>
					<div className="row">{ this.renderTextField('email', 'Email', notValidInput, true, 'email') }</div>
					<div className="row">{ this.renderTextField('phone', 'Phone', notValidInput, true, 'number') }</div>
					<div className="row">{ this.renderTextField('zip', 'Zip', notValidInput) }</div>
				</form>
				<div id="btn_next">
					<button className="btn btn-primary" onClick={this.onNext}>Next</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		voter: state.voter
	}
};


const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterDetail));