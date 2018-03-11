import React, {Component} from 'react';
import {connect} from 'react-redux'
import VoterAction from "../../actions/VoterAction";
import YouTube from "react-youtube";

import { textValidation } from '../../utility/FormValidation'
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
	}
    
    onNext(event) {
		console.log(this.state.voterDetail);
	}

	render() {
		const { makelist } = this.props.makelist;
		const { voter_num } = this.props.location.state;
		const firstName = makelist['firstname' + voter_num];
		const lastName = makelist['lastname' + voter_num];

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
								onChange={this.updateVoterFields.bind(this, 'city')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="state">State</label>
							<select className="input-field" id="state" ref="state"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'state')}>
								<option></option>
								<option value="CA">CA</option>
								<option value="TX">TX</option>
								<option value="FL">FL</option>
								<option value="CO">CO</option>
							</select>
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="address">Address</label>
							<input type="text" className="input-field" id="address" ref="address"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'address')}></input>
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="birthday">Birthday</label>
							<input type="date" className="input-field" id="birthday" ref="birthday"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'birthday')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="gender">Gender</label>
							<select className="input-field" id="gender" ref="gender"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'gender')}>
								<option></option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="email">Email</label>
							<input type="email" className="input-field" id="email" ref="email"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'email')}></input>
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="phone">Phone</label>
							<input type="tel" className="input-field" id="phone" ref="phone"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'phone')}></input>
						</div>
					</div>

					<div className="row">
						<div className="form-group col-xs-12">
							<label className="pull-left" htmlFor="zip">Zip</label>
							<input type="text" className="input-field" id="zip" ref="zip"
								required="" aria-required="true"
								onChange={this.updateVoterFields.bind(this, 'zip')}></input>
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