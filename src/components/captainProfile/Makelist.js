import React, {Component} from 'react';
import {connect} from 'react-redux'
import VoterAction from "../../actions/VoterAction";
import YouTube from "react-youtube";
import routes from '../../constants/Routes';
import History from '../../utility/History';

import { textValidation } from '../../utility/FormValidation'
class Makelist extends Component {


	constructor() {
		super();
		this.state = {
			makelistNames:{
				firstname1      : '',
				lastname1       : '',
				firstname2      : '',
				lastname2       : '',
				firstname3      : '',
				lastname3       : '',
				firstname4      : '',
				lastname4       : '',
			},
			isValid:{
				firstname1      : true,
				lastname1       : true,
				firstname2      : true,
				lastname2       : true,
				firstname3      : true,
				lastname3       : true,
				firstname4      : true,
				lastname4       : true,
			}
		}
	}

	updateMakelistFields(field, event) {
		let fields = Object.assign({}, this.state.makelistNames);
		fields[field] = event.target.value;
		this.setState({
			makelistNames: fields
		})
	}
	
	validateRegisterFields(field, event) {

		let validation = Object.assign({}, this.state.isValid);
		validation[field] = textValidation(event.target.value);

		this.setState({
			isValid: validation
		})
	}
    
    onNext(event) {
		console.log(this.state.makelistNames)

		let validation = Object.assign({}, this.state.isValid);

		for (let key in this.state.makelistNames) {
			validation[key] = textValidation(this.state.makelistNames[key]);
		}

		this.setState({
			isValid: validation
		})

		for (let key in this.state.makelistNames) {
			if (validation[key] == false) {
				return ;
			}
		}

		this.props.btwMakelist(this.state.makelistNames)

		History.push(routes.voterDetail, {'voter_num': 1});
		History.go();
	}

	goBackToHomePage() {
			History.push( routes.login );
			History.go();
	}

	render() {

		return (
			<div className='btw-identity btw-makelist'>
				<button className='btn btn-primary' style={{'left': '2%', 'position': 'absolute'}}
								onClick={this.goBackToHomePage.bind(this, 'backToHomePage')}>
						Go back
				</button>
				<div className="intro">
					<p className="intro-title">
                        Generate Lorem Ipsum placeholder text
					</p>

					<p className="intro-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<form>
					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname1">First Name</label>
							<input type="text" className="input-field" id="firstname1" ref="firstname1"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname1')}
								onBlur={this.validateRegisterFields.bind(this, 'firstname1')}></input>
							{ !this.state.isValid.firstname1 && <span className="pull-left">* Input is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname1">Last Name</label>
							<input type="text" className="input-field" id="lastname1" ref="lastname1"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname1')}
								onBlur={this.validateRegisterFields.bind(this, 'lastname1')}></input>
							{ !this.state.isValid.lastname1 && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>


					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname2">First Name</label>
							<input type="text" className="input-field" id="firstname2" ref="firstname2"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname2')}
								onBlur={this.validateRegisterFields.bind(this, 'firstname2')}></input>
							{ !this.state.isValid.firstname2 && <span className="pull-left">* Input is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname2">Last Name</label>
							<input type="text" className="input-field" id="lastname2" ref="lastname2"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname2')}
								onBlur={this.validateRegisterFields.bind(this, 'lastname2')}></input>
							{ !this.state.isValid.lastname2 && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>


					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname3">First Name</label>
							<input type="text" className="input-field" id="firstname3" ref="firstname3"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname3')}
								onBlur={this.validateRegisterFields.bind(this, 'firstname3')}></input>
							{ !this.state.isValid.firstname3 && <span className="pull-left">* Input is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname3">Last Name</label>
							<input type="text" className="input-field" id="lastname3" ref="lastname3"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname3')}
								onBlur={this.validateRegisterFields.bind(this, 'lastname3')}></input>
							{ !this.state.isValid.lastname3 && <span className="pull-left">* Input is not valid *</span> }
						</div>
					</div>

                    <div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname4">First Name</label>
							<input type="text" className="input-field" id="firstname4" ref="firstname4"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname4')}
								onBlur={this.validateRegisterFields.bind(this, 'firstname4')}></input>
							{ !this.state.isValid.firstname4 && <span className="pull-left">* Input is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname4">Last Name</label>
							<input type="text" className="input-field" id="lastname4" ref="lastname4"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname4')}
								onBlur={this.validateRegisterFields.bind(this, 'lastname4')}></input>
							{ !this.state.isValid.lastname4 && <span className="pull-left">* Input is not valid *</span> }
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
	return {}
}


const mapDispatchToProps = (dispatch) => ({
	btwMakelist: (makelist) => dispatch(VoterAction.btwMakelist(makelist))
})

export default connect(mapStateToProps, mapDispatchToProps)(Makelist);