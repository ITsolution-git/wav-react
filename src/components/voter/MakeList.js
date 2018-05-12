import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import voterConstants from '../../constants/reducerConstants/VoterConstants';
import { makeListPersist } from '../../actions/VoterAction';
import routes from '../../constants/Routes';
import BaseComponent from '../shared/BaseComponent';

import { FirstNameInput, LastNameInput } from '../shared/validatedInputs';

const firstNamePrefix = voterConstants.FIRST_NAME_PREIX,
	  lastNamePrefix = voterConstants.LAST_NAME_PREFIX,
	  invalidPrefix = 'invalid',
	  numberOfNames = voterConstants.VOTERS_COUNT;

class MakeList extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			startValidation: false
		};
	}

	handleChange = (value, isValid, name) => {
		this.setState({
			[name]: value,
			[`${name}${invalidPrefix}`]: isValid
		});
	};

	getNamesArray = (prefix) => {
		return Array(numberOfNames).fill(0).map((e, i) => `${prefix}${i + 1}`);
	};


    onNext = () => {
    	this.setState({ startValidation: true });

    	const stateNames = this.getNamesArray(firstNamePrefix).concat(this.getNamesArray(lastNamePrefix)),
			  namesObj = {};
    	let isInvalid = false;
		stateNames.forEach(name => {
			if (!this.state[`${name}${invalidPrefix}`]) {
				isInvalid = true;
			}
			namesObj[name] = this.state[name];
		});

    	if (isInvalid) {
    		return;
		}


		this.props.actions.makeListPersist(namesObj);
    	this.onLink(routes.voterDetail);
	};

	render() {
		const { startValidation } = this.state;
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
				{ Array(numberOfNames).fill(0).map((e,i)=> {
					return (
						<Row key={i} className="row names">
							<Col xs={6}>
								<FirstNameInput startValidation={startValidation}
												 required
												 onChange={(val, isValid) => this.handleChange(val, isValid, `${firstNamePrefix}${i + 1}`)} />
							</Col>
							<Col xs={6}>
								<LastNameInput startValidation={startValidation}
											    required
												onChange={(val, isValid) => this.handleChange(val, isValid, `${lastNamePrefix}${i + 1}`)}/>
							</Col>
						</Row>
					)
				})}
				<Row>
					<Col xs={6}>
						{ this.isMobile() && this.renderBackToHome()}
					</Col>
					<Col md={12} xs={6}>
                        <button className="btn btn-primary" onClick={this.onNext}>Next</button>
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