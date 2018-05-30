import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import Radio from 'material-ui/Radio';
import Modal from 'material-ui/Modal';

import voterConstants from '../../constants/reducerConstants/VoterConstants';
import { makeListPersist } from '../../actions/VoterAction';
import routes from '../../constants/Routes';
import BaseComponent from '../shared/BaseComponent';

import { FirstNameInput, LastNameInput } from '../shared/validatedInputs';
import Button from '../shared/Button';

const firstNamePrefix = voterConstants.FIRST_NAME_PREIX,
	  lastNamePrefix = voterConstants.LAST_NAME_PREFIX,
	  invalidPrefix = 'invalid',
	  numberOfNames = voterConstants.VOTERS_COUNT;

class MakeList extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			startValidation: false,
			view: 1
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

	handleClose = () => {
		this.setState({ view: 2 });
	};

	render() {
		const { startValidation } = this.state;
		return (
			<div className="btw-makelist">
				<Modal
					open={this.state.view === 1}
					onClose={this.handleClose}
					disableBackdropClick={true}>
					<div className="view1">
						<div className="view1-title">Welcome to the Team</div>
						<div className="view1-desc">
							We think this is the Start of a beautiful friendship<br/><br/>
							Speaking of Friends...
						</div>
						<div className="view1-nav">
							<div className="radio1"></div>
							<div className="radio2"></div>
							<div className="view-next" onClick={this.handleClose}></div>
						</div>
					</div>
				</Modal>

				<div className='container'>

					<div className="title">
						<div className="app-title">BeTheWave</div>

						{ 
							this.state.view === 2 && 
							<div>
								<span className="title">Let's Start with Four Friends</span>
								<div className="title-line"></div>
							</div>
						}
					</div>

					<div className="voters-form">
						<div className="intro">
							<p className="intro-title">
								We'll check Local Voter Databases to<br />
								Find out if They're Registered to Vote.
							</p>

							<p className="intro-desc">
								We understand that their info is private and we won't be sharing it.
							</p>
							{ this.renderRequiredFieldMsg() }
						</div>
						<div className="rows mb-1">
						{ Array(numberOfNames).fill(0).map((e,i)=> {
							return (
								<Row key={i} className="names">
									<Col xs={2}>
										<Radio 
											checked={ !!this.state[`${firstNamePrefix}${i+1}${invalidPrefix}`] &&
											!!this.state[`${lastNamePrefix}${i+1}${invalidPrefix}`] }
											classes={{
												checked: `checkbox`
											}}
											disabled
										/>
									</Col>
									<Col xs={10}>
										<Row>
											<Col xs={12} md={6}>
												<FirstNameInput startValidation={startValidation}
																required
																onChange={(val, isValid) => this.handleChange(val, isValid, `${firstNamePrefix}${i + 1}`)} />
											</Col>
											<Col xs={12} md={6}>
												<LastNameInput startValidation={startValidation}
																required
																onChange={(val, isValid) => this.handleChange(val, isValid, `${lastNamePrefix}${i + 1}`)}/>
											</Col>
										</Row>
									</Col>
								</Row>
							)
						})}
						</div>
						<Row>
							<Col xs={6}>
							</Col>
							<Col md={12} xs={6}>
								<Button onClick={this.onNext}>Find My Friends</Button>
							</Col>
						</Row>
					</div>
				</div>
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