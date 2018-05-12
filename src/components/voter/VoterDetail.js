import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-bootstrap';

import voterConstants from '../../constants/reducerConstants/VoterConstants';
import { voterDetailsPersist, matchListPersist, resetMatchList  } from '../../actions/VoterAction';
import BaseComponent from '../shared/BaseComponent';
import NextButton from './shared/NextButton';
import { getUrlParam } from '../../helpers/UrlHelper';
import Spinner from '../shared/Spinner';

import FieldConstants from '../../constants/FieldConstants';
import {
	CityInput,
	StateInput,
	EmailInput,
	DateOfBirthInput,
	GenderInput,
	AddressInput,
	PhoneInput,
	ZipCodeInput
} from '../shared/validatedInputs';

class VoterDetail extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		const loadPrevious = this.isLoadPrevious();
		const { voterDetails } = this.props.voter;
		this.state = {
			startValidation: loadPrevious,
            valid: {
				[FieldConstants.city]: false,
				[FieldConstants.state]: false,
				[FieldConstants.email]: false
			},
			voterDetail: loadPrevious ? voterDetails : {}
		};
	}

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
		const {
			makeList,
			currentNumber,
			matchListError,
			matchListFetching
		} = this.props.voter,
			firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`],
			loadPrevious = this.isLoadPrevious(),
			emailDisabled = !!loadPrevious;

		const {
			startValidation,
            voterDetail
		} = this.state;

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
				<Row>
					<Col md={6}>
						<CityInput onChange={this.handleChange}
								   defaultValue={voterDetail[FieldConstants.city]}
								   startValidation={startValidation}
								   required />
					</Col>
					<Col md={6}>
						<StateInput onChange={this.handleChange}
									defaultValue={voterDetail[FieldConstants.state]}
									startValidation={startValidation}
									required />
					</Col>
				</Row>
				<Col>
					<EmailInput onChange={this.handleChange}
								defaultValue={voterDetail[FieldConstants.email]}
								startValidation={startValidation}
								disabled={emailDisabled}
								customError={matchListError}
								required />
				</Col>
				<Row>
					<Col md={6}>
						<DateOfBirthInput defaultValue={voterDetail[FieldConstants.dateOfBirth]}
										   onChange={this.handleChange} />
					</Col>
					<Col md={6}>
						<GenderInput defaultValue={voterDetail[FieldConstants.gender]}
									 onChange={this.handleChange} />
					</Col>
				</Row>
				<Col>
					<AddressInput defaultValue={voterDetail[FieldConstants.address]}
								  onChange={this.handleChange} />
				</Col>
				<Col>
					<PhoneInput defaultValue={voterDetail[FieldConstants.phone]}
								onChange={this.handleChange} />
				</Col>
				<Col>
					<ZipCodeInput defaultValue={voterDetail[FieldConstants.zipCode]}
								  onChange={this.handleChange} />
				</Col>
				<Row>
                    <Col mdOffset={3} md={3} xs={6}>
						{ loadPrevious ?
                            <NextButton title='Next Name' />
							: this.isMobile && this.renderBackToHome()
                        }
                    </Col>
                    <Col md={3} xs={6}>
                        <Button className="btn btn-primary"
								disabled={matchListFetching}
								onClick={this.onNext}>
                            {loadPrevious ? 'Resubmit' : 'Next'}
                        </Button>
                    </Col>
				</Row>
                <Spinner loading={matchListFetching} height={130} />
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