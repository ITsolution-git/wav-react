import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { voterDetailsPersist, matchListPersist, resetMatchList  } from '../../actions/VoterAction';
import BaseComponent from '../shared/BaseComponent';
import { getUrlParam } from '../../helpers/UrlHelper';
import Spinner from '../shared/Spinner';
import Button from '../shared/Button';
import FieldConstants from '../../constants/FieldConstants';
import {
	FirstNameInput,
	LastNameInput,
	CityInput,
	StateInput,
	EmailInput,
	DateOfBirthInput,
	AddressInput,
} from '../shared/validatedInputs';

import OnBoardingLayout from './shared/OnBoardingLayout';
import ProgressBar from './shared/ProgressBar';

class VoterDetail extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		const loadPrevious = this.isLoadPrevious();
		const { voterDetails } = this.props.voter;
		this.state = {
			startValidation: loadPrevious,
            valid: this.getRequiredDefaults(),
			voterDetail: loadPrevious ? voterDetails : {}
		};
	}

	getRequiredDefaults = () => {
		return {
            [FieldConstants.city]: false,
            [FieldConstants.state]: false,
            [FieldConstants.email]: false
		}
	};

	handleChange = (value, isValid, name) => {
		this.setState(state => {
            const { voterDetail, valid } = state;
			return {
                voterDetail: { ...voterDetail, [name]: value },
                valid: { ...valid, [name]: isValid }
			}
        });
	};

    onNext = () => {
		this.setState({ startValidation: true });
        const { voterDetail, valid } = this.state;
        if (Object.values(valid).every(val => val)) {
            const { voterDetailsPersist, matchListPersist } = this.props.actions;
            voterDetailsPersist(voterDetail);
            matchListPersist(voterDetail, this.isLoadPrevious());
        }
	};

    viewProps = () => {
        if (this.isMobile()) {
            return {
                buttonColor: 'blue',
                titleClass: 'title-24-blue',
            }
        }

        return {
            buttonColor: 'light-blue',
            titleClass: 'title-32-white',
            subtitleClass: 'title-24-white'
        }
    };

    renderInfoText = () => {
        return (
            <span>
				We only use this information to verify their registration.
				We will never contact them!
			</span>
        )
    };

    getNames = () => {
        const { makeList = {}, currentNumber } = this.props.voter,
        	 { voterDetail} = this.state,
		     getName = (field) => voterDetail[field] || makeList[`${field}${currentNumber}`];
        return {
        	firstName: getName(FieldConstants.firstName),
			lastName: getName(FieldConstants.lastName)
		}

	};

    isLoadPrevious = () => {
    	return getUrlParam(this.props, 'loadPrevious');
    };

    componentWillReceiveProps(props){
    	const { voter: { voterRoute } } = props;
    	if (voterRoute) {
            this.onLink(voterRoute);
		}
	}

	componentWillMount() {
    	this.props.actions.resetMatchList();
	}

	render() {
		const { matchListFetching } = this.props.voter,
			{ firstName, lastName } = this.getNames(),
			loadPrevious = this.isLoadPrevious(),
			emailDisabled = !!loadPrevious;

		const {
			startValidation,
            voterDetail
		} = this.state;

		const viewProps = this.viewProps(),
        	errorWhite = this.isDesktop(),
            showAsterisk = this.isMobile();

		return (
			<OnBoardingLayout>
                <div className='btw-voter-detail'>
					<Col md={8} className='no-padding'>
                        <Col id="title" className={viewProps.titleClass}>
                            { 'Tell us more about ' + firstName || '' + " " + lastName || '' }...
                        </Col>
					</Col>
					<Col md={8} xsHidden className='no-padding'>
						<Col className={viewProps.subtitleClass} id="required-info">
							Required Information: <FontAwesome id='info-icon' name='info-circle' />
						</Col>
					</Col>
					<Row>
                        <Col md={8}>
							 <Row>
								 <Col md={6} xs={6}>
									 <FirstNameInput errorWhite={errorWhite}
													  onChange={this.handleChange}
													  defaultValue={firstName}
													  startValidation={startValidation}
													  showAsterisk={showAsterisk}
													  disabled
													  required />
								 </Col>
								 <Col md={6} xs={6}>
									 <LastNameInput errorWhite={errorWhite}
													 defaultValue={lastName}
                                                    onChange={this.handleChange}
													 startValidation={startValidation}
                                                    showAsterisk={showAsterisk}
                                                    disabled
													 required />
								 </Col>
							 </Row>
                            <Col>
                                <EmailInput onChange={this.handleChange}
                                            defaultValue={voterDetail[FieldConstants.email]}
                                            startValidation={startValidation}
                                            disabled={emailDisabled}
                                            errorWhite={errorWhite}
                                            showAsterisk={showAsterisk}
                                            required />
                            </Col>
                            <Row>
                                <Col md={7} xs={7}>
                                    <CityInput onChange={this.handleChange}
                                               defaultValue={voterDetail[FieldConstants.city]}
                                               startValidation={startValidation}
                                               errorWhite={errorWhite}
                                               showAsterisk={showAsterisk}
                                               required />
                                </Col>
                                <Col md={5} xs={5}>
                                    <StateInput onChange={this.handleChange}
                                                defaultValue={voterDetail[FieldConstants.state]}
                                                startValidation={startValidation}
                                                errorWhite={errorWhite}
                                                showAsterisk={showAsterisk}
                                                required />
                                </Col>
                            </Row>
							<Col id="helpful-info" className={`no-padding ${viewProps.subtitleClass}`} xsHidden>
								Helpful Information:
							</Col>
                            <Row id='voter-address'>
                                <Col md={6} xs={7}>
                                    <DateOfBirthInput defaultValue={voterDetail[FieldConstants.dateOfBirth]}
                                                      errorWhite={errorWhite}
                                                      onChange={this.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <AddressInput defaultValue={voterDetail[FieldConstants.address]}
                                                  errorWhite={errorWhite}
                                                  onChange={this.handleChange} />
                                </Col>
                            </Row>
                            <Col id="go-button" md={6} xs={12} className="no-padding">
                                <Button disabled={matchListFetching}
                                        color={viewProps.buttonColor}
                                        onClick={this.onNext}>
                                    Go!
                                </Button>
                            </Col>
                        </Col>
                        <Col md={4} xsHidden>
                            <div id="info" >
                                <div className="text-18-light-blue-bold">
                                    { this.renderInfoText() }
                                </div>
                            </div>
                        </Col>
					</Row>
                    <Col md={9} xsHidden className="no-padding" id="progress-bar">
                        <ProgressBar width='50%' />
                    </Col>
                    <Col smHidden mdHidden lgHidden xs={11} xsOffset={1}>
                        <div id="info-text-mobile" className="title-14-dark-blue">
							Don't worry! <br />
							We won't use any of these information to <br />
							contact them!
						</div>
                    </Col>
                    <Col md={10} xs={12}>
                        <Spinner loading={matchListFetching} height={100} />
                    </Col>
                </div>
			</OnBoardingLayout>
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
