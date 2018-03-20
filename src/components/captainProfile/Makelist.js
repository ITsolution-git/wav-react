import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import VoterAction from "../../actions/VoterAction";
import routes from '../../constants/Routes';
import History from '../../utility/History';

import { textValidation } from '../../utility/FormValidation';
import BaseComponent from '../shared/BaseComponent';

const firstNamePrefix = 'firstname',
	  lastNamePrefix = 'lastname',
	  invalidPrefix = 'invalid',
	  numberOfNames = 4;

class Makelist extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	updateMakelistFields = (field, event) => {
		this.setState({[field]: event.target.value });
	};
	
	validateRegisterFields = (field, event) => {
		const isValid = textValidation(event.target.value);
		this.setState({ [`${field}${invalidPrefix}`]: !isValid });
	};

	getNamesArray = (prefix) => {
		return Array(numberOfNames).fill(0).map((e, i) => `${prefix}${i + 1}`);
	};


    onNext = () => {
    	const stateNames = this.getNamesArray(firstNamePrefix)
								.concat(this.getNamesArray(lastNamePrefix));
    	const validationObj = {};
    	stateNames.forEach(name => {
            validationObj[`${name}${invalidPrefix}`] = !textValidation(this.state[name] || '');
		});

        this.setState(validationObj);
    	const isInvalid = Object.values(validationObj).some(val => val);

    	if (isInvalid) {
    		return;
		}

		this.props.btwMakelist(this.state);
		History.push(routes.voterDetail, {'voter_num': 1});
		History.go();
	};

	goBackToHomePage() {
    	this.onLink(routes.login);
	}

	renderField = ({ name, label }) => {
		return (
            <div className="form-group col-xs-6">
                <label className="pull-left" htmlFor={name}>{ label }</label>
                <input type="text" className="input-field" id={name} ref={name}
                       required="" aria-required="true"
                       onChange={e => this.updateMakelistFields(name, e)}
                       onBlur={e => this.validateRegisterFields(name, e)} />
                { this.state[`${name}${invalidPrefix}`] && <span className="pull-left">* Input is not valid *</span> }
            </div>
		)
	};

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
					{ Array(numberOfNames).fill(0).map((e,i)=> {
						return (
                            <div key={i} className="row">
                                { this.renderField({ name: `${firstNamePrefix}${i + 1}`, label: 'First Name'})}
                                { this.renderField({ name: `${lastNamePrefix}${i + 1}`, label: 'Last Name'})}
                            </div>
						)
                    })}
				</form>
				<div id="btn_next">
					<button className="btn btn-primary" onClick={this.onNext}>Next</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
};


const mapDispatchToProps = (dispatch) => ({
	btwMakelist: (makelist) => dispatch(VoterAction.btwMakelist(makelist))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Makelist));