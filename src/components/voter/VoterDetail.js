import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-bootstrap';

import states from '../../constants/States';
import validationTypes from '../../constants/ValidationTypes';
import voterConstants from '../../constants/VoterConstants';
import { voterDetailsPersist, matchListPersist, resetMatchList  } from '../../actions/VoterAction';
import BaseComponent from '../shared/BaseComponent';
import NextButton from './shared/NextButton';
import { getUrlParam } from '../../helpers/UrlHelper';
import  { validate } from '../../utility/InputValidator';
import { getAgeYears } from '../../helpers/InputHelper';


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
            phonenumber: initValue,
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
		const { email, phonenumber, zip } = validationTypes;
		if ([ email, phonenumber, zip].includes(name)) {
			return !value || validate(name, value);
		}
		return ['state', 'city'].includes(name)
			? !!value
			: true;
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

	renderTextField = (name, label, errorText, isWholeRow = true, type='text', disabled=false) => {
		const width = isWholeRow || this.isMobile() ? 12 : 6;
		const input = (
            <input type={type} className='input-field'
                   value={ this.state.voterDetail[name]}
                   disabled={disabled}
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
		return this.renderInputDiv(this.isMobile() ? 12 : 6, label, name, input, errorText);
	};

    renderAgeDropdown = () => {
    	const name = 'birthday',
			  options = getAgeYears();

        const input = (
            <Fragment>
                <select className="input-field"
                        value={this.state.voterDetail[name]}
                        onChange={this.updateVoterFields.bind(this, name)}>
                    <option value="" />
                    { options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
                </select>
                <div>voter should be 18years and above</div>
            </Fragment>
        );
        return this.renderInputDiv(this.isMobile() ? 12 : 6, 'Year of birth', 'birthday', input, '* Input is not valid *');
    };

    isLoadPrevious = () => {
    	return getUrlParam(this.props, 'loadPrevious');
    };

    componentWillReceiveProps(props){
    	const { voter: { voterRoute, matchListError } } = props;
    	if (voterRoute) {
            this.onLink(voterRoute);
		}
		if (matchListError) {
    	    const isValid = {... this.state.isValid };
    	    isValid.email = false;
    	    this.setState({ isValid });
        }
	}

	componentWillMount() {
    	this.props.actions.resetMatchList();
	}

	render() {
		const { makeList, currentNumber, matchListError } = this.props.voter,
			firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`],
			loadPrevious = this.isLoadPrevious(),
			notValidInput = '* Input is not valid *',
			emailDisabled = loadPrevious;

		return (
			<div className='btw-voter btw-voter-detail container'>
				{ this.isDesktop() && this.renderBackToHome() }
				<div className="intro">
					<p className="intro-title">
					{ 'Tell us more about ' + firstName || '' + " " + lastName || '' }
					</p>
					<p className="intro-desc">
						The more information you provide, the more accurately we can verify if they are registered to vote. (Don’t worry, we’ll NEVER share this information with anybody else.) 
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
					<div className="row">{ this.renderTextField('email', 'Email *', matchListError || notValidInput, true, 'email', emailDisabled) }</div>
					<div className="row">{ this.renderTextField('phonenumber', 'Phone', notValidInput, true, 'number') }</div>
					<div className="row">{ this.renderTextField('zip', 'Zip', notValidInput) }</div>
				</form>
				<Row>
                    <Col mdOffset={3} md={3} xs={6}>
						{ loadPrevious ?
                            <NextButton title='Next Name' />
							: this.isMobile && this.renderBackToHome()
                        }
                    </Col>
                    <Col md={3} xs={6}>
                        <Button className="btn btn-primary" onClick={this.onNext}>
                            {loadPrevious ? 'Resubmit' : 'Next'}
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
        actions: bindActionCreators({ voterDetailsPersist, matchListPersist, resetMatchList }, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterDetail));