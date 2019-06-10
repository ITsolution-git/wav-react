import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';

import voterConstants from '../../constants/reducerConstants/VoterConstants';
import { makeListPersist } from '../../actions/VoterAction';
import routes from '../../constants/Routes';
import BaseComponent from '../shared/BaseComponent';
import { FirstNameInput, LastNameInput } from '../shared/validatedInputs';
import Button from '../shared/Button';
import OnBoardingLayout from './shared/OnBoardingLayout';
import ProgressBar from './shared/ProgressBar';

const firstNamePrefix = voterConstants.FIRST_NAME_PREIX,
	  lastNamePrefix = voterConstants.LAST_NAME_PREFIX,
	  invalidPrefix = 'invalid',
	  numberOfNames = voterConstants.VOTERS_COUNT;

class MakeList extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			startValidation: false,
			duplicateNames: false
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


	isUnique = () => {
		const names = new Set();

		for (let i = 1; i <= numberOfNames; i++) {
			const firstName = this.state[`${firstNamePrefix}${i}`],
				lastName = this.state[`${lastNamePrefix}${i}`];
			names.add(firstName.toLowerCase().trim() + lastName.toLowerCase().trim());
		}
		return names.size === numberOfNames;
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

		const isUnique = this.isUnique();
        this.setState({ duplicateNames: !isUnique });

    	if (!isUnique) {
    		return;
		}

		this.props.actions.makeListPersist(namesObj);
    	this.onLink(routes.voterDetail);
	};

    viewProps = () => {
    	if (this.isMobile()) {
    		return {
    			buttonColor: 'blue',
				titleClass: '',
				subtitleClass: ''
			}
		}

		return {
    		buttonColor: 'light-blue',
			titleClass: '',
			subtitleClass: ''
		}
	};

    renderInfoText = () => {
    	return (
    		<span>
				We check local voter
				databases to find out if
				they're registered to vote.
				We understand that their
				info is private and won't
				be sharing it!
			</span>
		)
	};

	render() {
		const { startValidation } = this.state,
		 viewProps = this.viewProps(),
         errorWhite = this.isDesktop();

		return (
			<OnBoardingLayout>
				<div className="btw-makelist">
					<div className="voters-form">
						<div className="rows">
                            <Col md={8} className="row" id="title-text">
                                <Col mdOffset={2} md={10}>
									{ this.state.duplicateNames && <div className={`${this.isMobile() ? 'warning-main' : 'warning-white'}`}>There are duplicate names in the list</div> }
                                    <div className={viewProps.titleClass}>Help your friends vote!</div>
                                    <div id="subtitle" className={viewProps.subtitleClass}>Check if three of your friends registered:</div>
                                </Col>
                            </Col>
							 <Row>
								<Col md={8} xs={12}>
									{ Array(numberOfNames).fill(0).map((e,i)=> {
										return (
											<Row key={i} className="row">
												<Col md={2} xsHidden className="radio">
													<Radio
														checked={ !!this.state[`${firstNamePrefix}${i+1}${invalidPrefix}`] &&
														!!this.state[`${lastNamePrefix}${i+1}${invalidPrefix}`] }
														classes={{
															root: 'default-checkbox',
															checked: `checked-checkbox`
														}}
														disabled
													/>
												</Col>
												<Col xs={6} md={5}>
													<FirstNameInput startValidation={startValidation}
																	required
																	errorWhite={errorWhite}
																	id={`firstname${i + 1}`}
																	onChange={(val, isValid) => this.handleChange(val, isValid, `${firstNamePrefix}${i + 1}`)} />
												</Col>
												<Col xs={6} md={5}>
													<LastNameInput startValidation={startValidation}
																   required
																   errorWhite={errorWhite}
																   id={`lastname${i + 1}`}
																   onChange={(val, isValid) => this.handleChange(val, isValid, `${lastNamePrefix}${i + 1}`)}/>
												</Col>
											</Row>
										)
									})}
								</Col>
								<Col md={4} xsHidden className='row'>
									<div id="info">
										<div className="text-18-light-blue-bold">
											{ this.renderInfoText() }
										</div>
									</div>
								</Col>
							</Row>
                            <Col md={8} xs={12} className="row" id="go-button">
                                <Col mdOffset={2} md={2} xs={12}>
                                    <Button color={viewProps.buttonColor}
                                            onClick={this.onNext}>Go!</Button>
                                </Col>
                            </Col>
							<Col md={8} xsHidden>
                                <Col id="progress-bar" mdOffset={2} md={10} xsHidden>
                                    <ProgressBar width='25%' />
                                </Col>
							</Col>
							<Col smHidden mdHidden lgHidden xs={10} xsOffset={1}>
                                <div id="info-text-mobile">{ this.renderInfoText() }</div>
							</Col>
						</div>
					</div>
				</div>
			</OnBoardingLayout>
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