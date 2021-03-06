import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { btwRegister } from '../../actions/SignOnAction';
import YouTube from 'react-youtube';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';

class Register extends BaseComponent {
	constructor() {
		super();
		this.state = {
			btwIdentity: this.getEmptyState(),
			isValid: this.getEmptyState(true)
		}
	}

	getEmptyState = (initValue = '') => {
		return {
            firstname: initValue,
            lastname: initValue,
            username: initValue,
            password: initValue,
            confirmPassword: initValue,
            email: initValue
        };
	};

	updateRegisterFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity[field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	validateRegisterFields(field, event) {
		const { btwIdentity, isValid } = this.state,
			{ value } = event.target;
		let validation = { ...isValid };

		validation[field] = field === 'confirmPassword'
			? btwIdentity.password === value
			: validate(field, value);

		this.setState({ isValid: validation });
	}

	btwRegister(event) {
		const { isValid, btwIdentity } = this.state;
		let validation = { ...isValid };
        Object.keys(btwIdentity).forEach(key => {
        	validation[key] = key === 'confirmPassword'
				? btwIdentity.password === btwIdentity[key]
				: validate(key,  btwIdentity[key]);
        });

		this.setState({ isValid: validation });

		return Object.keys(btwIdentity).some(key => !validation[key])
			? true
			: this.props.btwRegister(btwIdentity);
	}

	renderInput = (name, label, inputType, colWidth = 12, errorMsg) => {
		return (
            <div className={`form-group col-xs-${colWidth}`}>
                <label className="pull-left" htmlFor={name}>{label}</label>
                <input type={inputType} className="input-field"
                       onChange={this.updateRegisterFields.bind(this, name)}
                       onBlur={this.validateRegisterFields.bind(this, name)} />
                { !this.state.isValid[name] && <span className="pull-left">{ errorMsg }</span> }
            </div>
		)
	};

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.onLink(routes.makelist);
			return;
		}
		if (props.error) {
            const isValid = {... this.state.isValid };
            isValid.email = false;
            this.setState({ isValid });
		}
	}

	render() {
		const opts = {
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 0
			}
		};

		const passwordErrorMsg = (
			<div>
				<div>At least one special character</div>
				<div>At least one number</div>
				<div>At lease one upper case character</div>
				<div>Minimum of 7</div>
			</div>
		);
		const { error } = this.props;
		const nameWidth = this.isMobile() ? 12 : 6;
		return (
			<div>
				<h8 className="pull-right" style={{ marginTop: '-30px', marginRight: '30px'}}>Already registered? <Link to='/'>Sign in here</Link></h8>
				<div className='btw-identity btw-register container'>
					<div>
						<YouTube
							videoId="2g811Eo7K8U"
							opts={opts}
							className="video"
							onReady={this._onReady}
						/>
					</div>
					<div className="intro">
						<p className="intro-title">
							Your Information
						</p>
					</div>
					<form>
						<div className="row">
							{ this.renderInput('firstname', 'First Name', 'text', nameWidth, '* First Name is not valid *') }
							{ this.renderInput('lastname', 'Last Name', 'text', nameWidth, '* Last Name is not valid *') }
						</div>
						{ this.renderInput('username', 'Username', 'text', 0, '* Username is not valid *') }
						{ this.renderInput('email', 'Email', 'email', 0, error || '* Email is not valid *') }
						<div className={classNames({'password-div': !this.state.isValid['password'] })}>
							{ this.renderInput('password', 'Password', 'password', 0, passwordErrorMsg) }
						</div>
						{ this.renderInput('confirmPassword', 'Confirm Password', 'password', 0, '* The passwords do not match *') }
					</form>
					<Row>
						<Col xs={6}>
							{ this.isMobile() && this.renderBackToHome()}
						</Col>
						<Col md={12} xs={6}>
							<div id="btn_signup">
								<button className="btn btn-primary" onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up</button>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    const { error, isSuccess } = state.app[appDataTypes.register];
    return {
        error,
        isSuccess
    };
};


const mapDispatchToProps = (dispatch) => ({
	btwRegister: (btwIdentity) => dispatch(btwRegister(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));