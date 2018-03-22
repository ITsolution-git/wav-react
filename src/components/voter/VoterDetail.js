import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-bootstrap';

import states from '../../constants/States';
import validationTypes from '../../constants/ValidationTypes';
import routes from '../../constants/Routes';
import voterConstants from '../../constants/VoterConstants';
import { voterDetailsPersist, matchListPersist  } from '../../actions/VoterAction';
import BaseComponent from '../shared/BaseComponent';
import NextButton from './NextButton';
import { getUrlParam } from '../../helpers/UrlHelper';
import  { validate } from '../../utility/InputValidator';


class VoterDetail extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		const emptyVoterObj = this.getEmptyObject();
		const loadPrevious = this.isLoadPrevious();
		const { currentNumber, voterDetails } = this.props.voter;
		this.state = {
			voterDetail: loadPrevious ?
				{ ...emptyVoterObj, ...voterDetails[currentNumber] }
				: emptyVoterObj,
			isValid: this.getEmptyObject(true)
		};
	}

	getEmptyObject = (initValue = '') => {
		return {
            city: initValue,
            state: initValue,
            address: initValue,
            birthday: initValue,
            gender: initValue,
            email: initValue,
            phone: initValue,
            zip: initValue,
        }
	};

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
		const { email, phone, zip } = validationTypes;
		if ([ email, phone, zip].includes(name)) {
			return !value || validate(name, value);
		}
		if (['state', 'city'].includes(name)) {
            return !!value;
		}
		return true;
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

	renderInputDiv = (width, label, name, input, errorText) => {
		return (
            <div className={`form-group col-xs-${width}`}>
                <label className="pull-left" htmlFor={name}>{ label }</label>
				{ input }
                { !this.state.isValid[name] && <span className="pull-left">{ errorText }</span> }
			</div>
		);
	};

	renderTextField = (name, label, errorText, isWholeRow = true, type='text') => {
		const width = isWholeRow ? 12 : 6;
		const input = (
            <input type={type} className='input-field'
                   value={ this.state.voterDetail[name]}
                   onChange={this.updateVoterFields.bind(this, name)}
                   onBlur={this.validateVoterFields.bind(this, name)} />
		);
		return this.renderInputDiv(width, label, name, input, errorText);
	};

	renderDropdownField = (name, label, options, errorText) => {
        const input =(
            <select className="input-field"
                    value={this.state.voterDetail[name]}
                    onChange={this.updateVoterFields.bind(this, name)}>
                <option value="" />
                { options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
            </select>
		);
		return this.renderInputDiv(6, label, name, input, errorText);
	};

    renderAgeDropdown = () => {
    	const name = 'birthday',
			  // 18 because user should be adult
			  fromYear = (new Date()).getFullYear() - 18,
			  // let select 100 years
			  options = Array(100).fill(0).map((e,i)=> fromYear - i);
        const input = (
            <Fragment>
                <select className="input-field"
                        value={this.state.voterDetail[name]}
                        onChange={this.updateVoterFields.bind(this, name)}>
                    <option value="" />
                    { options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
                </select>
                <div>You must be 18 years and above</div>
            </Fragment>
        );
        return this.renderInputDiv(6, 'Year of birth', 'birthday', input, '* Input is not valid *');
    };

    isLoadPrevious = () => {
    	return getUrlParam(this.props, 'loadPrevious');
    };

	render() {
		const { makeList, currentNumber } = this.props.voter,
			firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`],
			loadPrevious = this.isLoadPrevious(),
			notValidInput = '* Input is not valid *';
		return (
			<div className='btw-voter btw-voter-detail'>
				{ this.renderBackToHome() }
				<div className="intro">
					<p className="intro-title">
                        { firstName || '' + " " + lastName || '' }
					</p>
					<p className="intro-desc">
                    	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
				<form>
					<div className="row">
						{ this.renderTextField('city', 'City *', '* City is required *', false) }
						{ this.renderDropdownField('state', 'State *', Object.values(states), '* State is required *') }
					</div>
					<div className="row">{ this.renderTextField('address', 'Address', notValidInput) }</div>
					<div className="row">
                        { this.renderAgeDropdown() }
                        { this.renderDropdownField('gender', 'Gender', ['Male', 'Female'], notValidInput) }
					</div>
					<div className="row">{ this.renderTextField('email', 'Email', notValidInput, true, 'email') }</div>
					<div className="row">{ this.renderTextField('phone', 'Phone', notValidInput, true, 'number') }</div>
					<div className="row">{ this.renderTextField('zip', 'Zip', notValidInput) }</div>
				</form>
				<Row>
                    { loadPrevious && <Col mdOffset={3} md={3}>
                        <NextButton title='Next Name' />
                    </Col> }
                    <Col md={loadPrevious ? 3 : 12}>
                        <Button className="btn btn-primary" onClick={this.onNext}>
                            { loadPrevious ? 'Resubmit' : 'Next' }
                        </Button>
                    </Col>
				</Row>
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