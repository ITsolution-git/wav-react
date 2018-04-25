import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { btwRegister } from '../../actions/SignOnAction';
import classNames from 'classnames';
import { Row, Col, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import states from '../../constants/States';

class VerifyCaptain extends BaseComponent {
	constructor() {
		super();
		this.state = {
			captainInfo: this.getEmptyState(),
			isValid: this.getEmptyState(true)
		}
	}

	getEmptyState = (initValue = '') => {
		return {
            username: initValue,
            firstname: initValue,
            lastname: initValue,
            city: initValue,
            state: initValue
        };
	};

	updateCaptainFields(field, event) {
		let info = Object.assign({}, this.state.captainInfo);
		info[field] = event.target.value;
		this.setState({
			captainInfo: info
		})
	}

	validateCaptainFields(field, event) {

        const { captainInfo, isValid } = this.state,
            { value } = event.target;
            
            console.log(captainInfo)
		let validation = { ...isValid };

        validation[field] = field === 'state' ?
            value !== ""
            : validate(field, value);

		this.setState({ isValid: validation });
	}

	btwVerify(event) {
		const { isValid, captainInfo } = this.state;
		let validation = { ...isValid };
        Object.keys(captainInfo).forEach(key => {
        	validation[key] = validate(key,  captainInfo[key]);
        });

		this.setState({ isValid: validation });

		// return Object.keys(captainInfo).some(key => !validation[key])
		// 	? true
		// 	: this.props.btwRegister(btwIdentity);
	}

	renderInput = (name, label, inputType, colWidth = 12, errorMsg) => {
		return (
            <div className={`form-group col-xs-${colWidth}`}>
                <label className="pull-left" htmlFor={name}>{label}</label>
                <input type={inputType} className="input-field"
                       onChange={this.updateCaptainFields.bind(this, name)}
                       onBlur={this.validateCaptainFields.bind(this, name)} />
                { !this.state.isValid[name] && <span className="pull-left">{ errorMsg }</span> }
            </div>
		)
    };
    
    renderDropdownField = (name, label, error, options, colWidth = 12) => {
		return (
			<div className={`form-group col-xs-${colWidth}`}>
				<label className="pull-left" htmlFor={name}>{label}</label>
                <select
                             className="input-field btw-select"
				             value={this.state.captainInfo[name] || ''}
				             onChange={this.updateCaptainFields.bind(this, name)}
                             onBlur={this.validateCaptainFields.bind(this, name)} >
					<option value="" />
					{ options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
				</select>
				{ !this.state.isValid[name] && <span className="pull-left" style={{color:"red"}}>{error}</span> }
			</div>
		);
	};

	componentWillReceiveProps(props) {

		// if (props.isSuccess) {
		// 	this.onLink(routes.makelist);
		// 	return;
		// }
		// if (props.error) {
        //     const isValid = {... this.state.isValid };
        //     isValid.email = false;
        //     this.setState({ isValid });
		// }
	}

	render() {

		const { error } = this.props;
        const nameWidth = this.isMobile() ? 12 : 6;
        
		return (
			<div>
				<div className='btw-change-password btw-verify container'>
					<div className="intro">
						<p className="intro-title">
                            Fill in these details for us to verify your account
						</p>
					</div>
					<form>
						<div className="row">
							{ this.renderInput('firstname', 'First Name (Legal)', 'text', nameWidth, '* First Name is not valid *') }
							{ this.renderInput('lastname', 'Last Name (Legal)', 'text', nameWidth, '* Last Name is not valid *') }
						</div>
                        { this.renderInput('username', 'Username', 'text', 0, '* Username is not valid *') }
                        { this.renderDropdownField('state', 'State', '* State is not valid *', Object.values(states), 0) }
						{ this.renderInput('city', 'City', 'text', 0, '* City is not valid *') }
						<br/><br/>
					</form>
					<Row>
						<Col xs={6}>	
							{ this.isMobile() && this.renderBackToHome()}
						</Col>
						<Col md={12} xs={6}>
							<div id="btn_verify">
								<button className="btn btn-primary" onClick={this.btwVerify.bind(this, 'btwVerify')}>Submit</button>
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
	//btwRegister: (btwIdentity) => dispatch(btwRegister(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyCaptain));