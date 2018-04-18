import React from 'react';
import {
	Modal,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	FormControl
} from 'react-bootstrap';

import states from '../../constants/States';
import  { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';

export default class AddEditDialog extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		const { voter = {}} = this.props;
		this.state = {
			'voter' : voter,
			'validation' : {
				'isValid' : false,
				'firstname': true,
				'lastname': true,
				'state': true,
				'city': true,
				'email': true,
				'phonenumber': true
			}
		}
	}

	validateInput(name, value) {
		name = name === 'phonenumber' ? 'phone' : name;
		if (name === 'email' || name === 'phone') {
			return validate(name, value);
		}
		return ['firstname', 'lastname', 'state', 'city'].includes(name)
			? !!value
			: true;
	}

	validateAll(callback) {
		let fields = ['firstname', 'lastname', 'state', 'city', 'email', 'phonenumber'];
		let validation = {};
		validation['isValid'] = true;

		for (let key in fields) {
			validation[fields[key]] = this.validateInput(fields[key], this.state.voter[fields[key]]);
			validation['isValid'] = validation['isValid'] && validation[fields[key]];
		}

		this.setState({ 'validation' : validation }, () => {
			if (validation['isValid'] === true) {
				callback();
			}
		});
	}

	validateRequired(name, value) {

		let validation = this.state;
		validation.validation[name === 'phonenumber' ? 'phone' : name] = this.validateInput(name, value);
		this.setState(validation);
	}

	onChange(name, value) {

		let voter = Object.assign({}, this.state.voter); 
		voter[name] = value;
		this.setState({'voter' : voter}, () => {

			this.validateRequired(name, value);
		});

	}

	renderField = (name, label, error, type="text") => {
		return (
			<Col md={6}>
				{ label }
				<FormControl type={type}
				             value={this.state.voter[name] || ''}
				             onChange={(e) => this.onChange(name, e.target.value)}
							 onBlur={(e) => this.validateRequired(name, e.target.value)}/>
				{ !this.state.validation[name] && <span className="pull-left" style={{color:"red"}}>{error}</span> }
			</Col>
		)
	};

	renderDropdownField = (name, label, error, options) => {
		return (
			<Col md={6}>
				{ label }
				<FormControl componentClass="select"
				             value={this.state.voter[name] || ''}
				             onChange={(e) => this.onChange(name, e.target.value)}
							 onBlur={(e) => this.validateRequired(name, e.target.value)}>
					<option value="" />
					{ options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
				</FormControl>
				{ !this.state.validation[name] && <span className="pull-left" style={{color:"red"}}>{error}</span> }
			</Col>
		);
	};

	onSubmitInner = () => {
		this.validateAll( () => {
			const voter = {...this.state.voter};
			this.props.onSubmit(voter);
		})
	};

	onCloseDialog = () => {
		const { onClose, voter = {} } = this.props;

		this.setState({
			'voter' : voter,
			'validation' : {
				'isValid' : false,
				'firstname': true,
				'lastname': true,
				'state': true,
				'city': true,
				'email': true,
				'phonenumber': true
			}
		})
		onClose();
	}

	render() {
		const {
			      show,
			      onClose,
			      submitText,
			      title='',
			      disableEmail = false
		      } = this.props;
		const { gender } = this.state.voter;
		return (
			<Modal show={show}
			       onHide={this.onCloseDialog}>
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form horizontal>
						<FormGroup>
							<Col md={12}>
								Email *
								<FormControl type="email"
								             disabled={disableEmail}
											 onChange={e => this.onChange('email', e.target.value)}
											 onBlur={(e) => this.validateRequired('email', e.target.value)}
								             value={this.state.voter['email'] || ''} />
								{ !this.state.validation['email'] && <span className="pull-left" style={{color:"red"}}>* Email is not valid *</span> }
							</Col>
						</FormGroup>
						<FormGroup>
							{ this.renderField('firstname', 'First name *', '* First name is not valid *') }
							{ this.renderField('lastname', 'Last name *', '* Last name is not valid *') }
						</FormGroup>
						<FormGroup>
							<Col md={6}>
								Gender
								<FormControl componentClass="select"
								             value={gender || ''}
								             onChange={e => this.onChange('gender', e.target.value)} >
									<option value="male">Male</option>
									<option value="female">Female</option>
								</FormControl>
							</Col>
							{ this.renderField('phonenumber', 'Phone', '* 10~11 digits are required *', 'number') }
						</FormGroup>
						<FormGroup>
							<Col md={12}>
								Address
								<FormControl type="text"
								             onChange={e => this.onChange('address', e.target.value)}
								             value={this.state.voter['address'] || ''} />
							</Col>
						</FormGroup>
						<FormGroup>
							{ this.renderDropdownField('state', 'State *', '* State is not valid *', Object.values(states)) }
							{ this.renderField('city', 'City *', '* City is not valid *') }
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Row>
						<Col md={12} className="btn-container">
							<Button className='btn-primary' onClick={this.onSubmitInner}>{submitText}</Button>
							<Button className='btn-primary' onClick={this.onCloseDialog}>Cancel</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		);
	}
}
