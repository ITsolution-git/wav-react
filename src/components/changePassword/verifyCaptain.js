import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { verifyUserRequest } from '../../actions/PasswordRequestAction';
import { getUrlParams } from '../../helpers/UrlHelper';

import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
import Button from "../shared/Button";
import {
	FirstNameInput,
	LastNameInput
} from '../../components/shared/validatedInputs';

class VerifyCaptain extends BaseComponent {
	constructor() {
		super();
		this.state = {
			firstname: '',
			lastname: '',
			valid: {
				firstname: false,
				lastname: false
			},
			isVerified: true
		}
	}

	handleChange = (value, isValid, name) => {
		this.setState({
			[name]: value,
			valid: { ...this.state.valid, [name]: isValid }
		});
	};

	btwVerify = () => {

		const { valid } = this.state
		let param = getUrlParams(this.props, 'email'), captainInfo = {};

		if (valid['firstname'] && valid['lastname']) {
			captainInfo["email"] = param.email;
			captainInfo["firstname"] = this.state.firstname;
			captainInfo["lastname"] = this.state.lastname;
			return this.props.verifyUserRequest(captainInfo);
		}
	}

	componentWillReceiveProps(props) {

		if (props.isSuccess) {
			this.onLink(routes.changePassword, { "id": props.user._id.toString() });
			return;
		} else {
			this.setState({ "isVerified": false });
		}
	}

	render() {

		return (
			<div className='btw-change-password btw-verify'>
				<div className="container">
					<div className="verify-captain col-lg-9 col-md-12">
						{!this.state.isVerified && <div className="warning-red">User doesn't exist</div>}
						<div>
							Fill in these details for us to verify your account
							</div>
						<div>
							<FirstNameInput
								onChange={this.handleChange}
								isVoter={false}
								name="firstname"
								uniqueValidationEnabled={false}
								required />
							<LastNameInput
								onChange={this.handleChange}
								isVoter={false}
								name="lastname"
								uniqueValidationEnabled={false}
								required />
						</div>
						<div id="btn-next">
							<Button onClick={this.btwVerify}>Submit</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { isSuccess, user } = state.request;
	return {
		isSuccess,
		user
	};
};


const mapDispatchToProps = (dispatch) => ({
	verifyUserRequest: (data) => dispatch(verifyUserRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyCaptain));