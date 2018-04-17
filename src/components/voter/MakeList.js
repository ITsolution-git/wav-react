import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import voterConstants from '../../constants/VoterConstants';
import { makeListPersist } from '../../actions/VoterAction';
import routes from '../../constants/Routes';
import { textValidation } from '../../utility/FormValidation';
import BaseComponent from '../shared/BaseComponent';

const firstNamePrefix = voterConstants.FIRST_NAME_PREIX,
	  lastNamePrefix = voterConstants.LAST_NAME_PREFIX,
	  invalidPrefix = 'invalid',
	  numberOfNames = voterConstants.VOTERS_COUNT;

class MakeList extends BaseComponent {
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
    	const stateNames = this.getNamesArray(firstNamePrefix).concat(this.getNamesArray(lastNamePrefix));
    	const validationObj = {},
			  namesObj = {};

    	stateNames.forEach(name => {
    		const nameVal = this.state[name] || '';
            validationObj[`${name}${invalidPrefix}`] = !textValidation(nameVal);
            namesObj[name] = nameVal;
		});

        this.setState(validationObj);
    	const isInvalid = Object.values(validationObj).some(val => val);

    	if (isInvalid) {
    		return;
		}

		this.props.actions.makeListPersist(namesObj);
    	this.onLink(routes.voterDetail);
	};

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
			<div className='btw-identity btw-makelist container'>
				{ this.isDesktop() && this.renderBackToHome()}
				<div className="intro">
					<p className="intro-title">
						Are your friends registered to vote?
					</p>

					<p className="intro-desc">
						Let’s check! Enter the name of 4 friends who you think might not be registered or are less likely to vote. <br/><br/>

						*The info we collect is only for checking if your friends are registered. We’re a nonprofit and never will sell you or your friends’ data.*  
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
				<Row>
					<Col xs={6}>
						{ this.isMobile() && this.renderBackToHome()}
					</Col>
					<Col md={12} xs={6}>
                        <div>
                            <button className="btn btn-primary" onClick={this.onNext}>Next</button>
                        </div>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ makeListPersist }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MakeList));