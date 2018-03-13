import React, {Component} from 'react';
import {connect} from 'react-redux';
import States from '../../constants/States';
import { emailValidation, phoneValidation, zipCodeValidation } from '../../utility/FormValidation';

class VoterDetail extends Component {


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

		let fields = Object.assign({}, this.state.voterDetail);
		fields[field] = event.target.value;

		this.setState({
			voterDetail: fields
		})

		// check if it is valid for select tag
		if ( field === "state" || field === "gender" ) {

			let validation = Object.assign({}, this.state.isValid);
			validation[field] = event.target.value == "" ? false : true;

			this.setState({
				isValid: validation
			})
		}
	}

	validateVoterFields(field, event) {

		let validation = Object.assign({}, this.state.isValid);

		if (field === "email") {
			validation[field] = emailValidation(event.target.value);
		} else if (field === "phone") {
			validation[field] = phoneValidation(parseInt(event.target.value));
		} else if (field === "zip") {
			validation[field] = zipCodeValidation(event.target.value);
		} else {
			validation[field] = event.target.value == "" ? false : true;
		}

		this.setState({
			isValid: validation
		})
	}
    
    onNext(event) {
		
		let validation = Object.assign({}, this.state.isValid);

		for (let key in this.state.voterDetail) {
			if (key === "email") {
				validation[key] = emailValidation(this.state.voterDetail[key]);
			} else if (key === "phone") {
				validation[key] = phoneValidation(parseInt(this.state.voterDetail[key]));
			} else if (key === "zip") {
				validation[key] = zipCodeValidation(this.state.voterDetail[key]);
			} else {
				validation[key] = this.state.voterDetail[key] == "" ? false : true;
			}
		}

		this.setState({
			isValid: validation
		})

		for (let key in this.state.makelistNames) {
			if (validation[key] == false) {
				return ;
			}
		}
	}

	render() {
		const { makelist } = this.props.makelist;
		const { voter_num } = this.props.location.state;
		const firstName = makelist['firstname' + voter_num];
		const lastName = makelist['lastname' + voter_num];

		// Make states array from json object
		var stateArr = [];
		Object.keys(States).forEach(function(key){
			stateArr.push(States[key]);
		})

		return (
			<div className='btw-voter btw-voter-detail'>

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
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="city">City</label>
							<input type="text" className="input-field" id="city" ref="city"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'city')}
								onBlur={this.validateVoterFields.bind(this, 'city')}></input>
							{ !this.state.isValid.city && <span className="pull-left">* Input is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="state">State</label>
							<select className="input-field" id="state" ref="state"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'state')}>
								<option value=""></option>
								{ stateArr.map( (item) => (<option value={item}>{item}</option>) ) }
							</select>
							{ !this.state.isValid.state && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="address">Address</label>
							<input type="text" className="input-field" id="address" ref="address"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'address')}
								onBlur={this.validateVoterFields.bind(this, 'address')}></input>
							{ !this.state.isValid.address && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="birthday">Birthday</label>
							<input type="date" className="input-field" id="birthday" ref="birthday"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'birthday')}
								onBlur={this.validateVoterFields.bind(this, 'birthday')}></input>
							{ !this.state.isValid.birthday && <span className="pull-left">* Input is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="gender">Gender</label>
							<select className="input-field" id="gender" ref="gender"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'gender')}>
								<option value=""></option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
							{ !this.state.isValid.gender && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="email">Email</label>
							<input type="email" className="input-field" id="email" ref="email"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'email')}
								onBlur={this.validateVoterFields.bind(this, 'email')}></input>
							{ !this.state.isValid.email && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="phone">Phone</label>
							<input type="number" className="input-field" id="phone" ref="phone"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'phone')}
								onBlur={this.validateVoterFields.bind(this, 'phone')}></input>
							{ !this.state.isValid.phone && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="zip">Zip</label>
							<input type="text" className="input-field" id="zip" ref="zip"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'zip')}
								onBlur={this.validateVoterFields.bind(this, 'zip')}></input>
							{ !this.state.isValid.zip && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

				</form>
				<div id="btn_next">
					<button className="btn btn-primary" onClick={this.onNext.bind(this, 'btwSignOn')}>Next</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		makelist: state.voter.btwMakelist
	}
}


const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(VoterDetail);