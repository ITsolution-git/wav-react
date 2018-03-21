import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import States from '../../constants/States';
import { emailValidation, phoneValidation, zipCodeValidation } from '../../utility/FormValidation';
import routes from '../../constants/Routes';
import voterConstants from '../../constants/VoterConstants';
import { voterDetailsPersist, matchListPersist  } from '../../actions/VoterAction';

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
		switch (name) {
			case 'email':
				return !value || emailValidation(value);
			case 'phone':
				return !value || phoneValidation(parseInt(value));
			case 'zip':
				return !value || zipCodeValidation(value);
			case 'state':
                return !!value;
			case 'city':
				return !!value;
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
		let validation = [...isValid];
		Object.keys(voterDetail).forEach(key => {
            validation[key] = this.validateInput(key, voterDetail[key]);
		});

		this.setState({ isValid: validation });

		if (Object.values(validation).every(val => val)) {
			const { voterDetailsPersist, matchListPersist } = this.props.actions;
            voterDetailsPersist(voterDetail);
            matchListPersist(voterDetail);
            this.onLink(routes.matchList);
		}
	};

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
		const firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`];
		const lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`];

		const notValidInput = '* Input is not valid *';
		return (
			<div className='btw-voter btw-voter-detail'>
				{ this.renderBackToHome() }
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
						{ this.renderDropdownField('state', 'State *', Object.values(States), '* State is required *') }
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


const mapDispatchToProps = (dispatch) => {
	return {
        actions: bindActionCreators({ voterDetailsPersist, matchListPersist }, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterDetail));