import React, { Component } from 'react';
import History from "../../../../utility/History";


class VoterAddForm extends Component {

	constructor() {
		super();
		this.state = {
			voter: {
				firstname: '',
				lastname: '',
				state: '',
				emailAddress: '',
				gender: '',
				city:'',
				address:'',
				zipcode: '',
				phonenumber: ''
			}
		}
	}

	handleManualVoterForm(field, event){
		event.preventDefault()
	}

	updateVoterFields(field, event) {
		let voter = Object.assign({}, this.state.voter);
		voter [field] = event.target.value;
		this.setState({
			voter: voter
		})
	}

	saveVoter(field, event){
		//do nothing
	}

	verifyUserFromCatalist(field, event){
		//do nothing
	}


	render() {
		return (
			<div className='btw-container'>

				<div className="">
					<p id="loginHeader">For a better chance of voter verification, enter as much information as you can</p>
					<span style={{color: 'red'}}>*</span><p id="loginHeader">Denotes required fields</p>

					<div className="input-field col s6">
						<input id="firstname" type="" className="btw-input-field" ref="firstname"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'firstname')}></input>
						<label htmlFor="username">First Name <span style={{color: 'red'}}>*</span></label>
					</div>

					<div className="input-field col s6">
						<input id="lastname" type="" className="btw-input-field" ref="lastname"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'lastname')}></input>
						<label htmlFor="lastname">Last Name <span style={{color: 'red'}}>*</span></label>
					</div>

					<div className="input-field col s6">
						<input id="state" type="" className="btw-input-field" ref="state"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'state')}></input>
						<label htmlFor="state">Voter State <span style={{color: 'red'}}>*</span> </label>
					</div>

					<div className="input-field col s6">
						<input id="email" type="" className="btw-input-field" ref="email"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'email')}></input>
						<label htmlFor="email">Email Address <span style={{color: 'red'}}>*</span> </label>
					</div>

					<div className="input-field col s6">
						<input id="gender" type="" className="btw-input-field" ref="gender"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'gender')}></input>
						<label htmlFor="gender">Voter Gender</label>
					</div>

					<div className="input-field col s6">
						<input id="dateofbirth" type="" className="btw-input-field" ref="dateofbirth"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'dateofbirth')}></input>
						<label htmlFor="dateofbirth">Voter City </label>
					</div>

					<div className="input-field col s6">
						<input id="address" type="" className="btw-input-field" ref="address"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'address')}></input>
						<label htmlFor="address">Voter Address</label>
					</div>

					<div className="input-field col s6">
						<input id="city" type="" className="btw-input-field" ref="city"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'city')}></input>
						<label htmlFor="city">Voter City </label>
					</div>

					<div className="input-field col s6">
						<input id="zipcode" type="" className="btw-input-field" ref="zipcode"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateVoterFields.bind(this, 'zipcode')}></input>
						<label htmlFor="zipcode">Voter Zipcode </label>
					</div>

					<div className='btw-container'>
						<button id='savebutton' className="btn-general btn"
						        onClick={this.saveVoter.bind(this, 'savebutton')}>
							<span className="btw-buttonText">Save Voter</span>
						</button>

						<button id='verifyvoter' className="btn-general btn"
						        onClick={this.verifyUserFromCatalist.bind(this, 'verifyvoter')}>
							<span className="btw-buttonText">Verify this Voter</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default VoterAddForm;