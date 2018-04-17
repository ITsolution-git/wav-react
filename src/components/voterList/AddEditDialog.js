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

	validate(callback) {
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

	onChange(name, value) {

		let voter = Object.assign({}, this.state.voter); 
		voter[name] = value;
		this.setState({'voter' : voter});
	}

	renderField = (name, label, type="text") => {
		return (
			<Col md={6}>
				{ label }
				<FormControl type={type}
				             value={this.state.voter[name] || ''}
				             onChange={(e) => this.onChange(name, e.target.value)}/>
				{ !this.state.validation[name] && <span className="pull-left">* {label} is not valid *</span> }
			</Col>
		)
	};

	renderDropdownField = (name, label, options) => {
		return (
			<Col md={6}>
				{ label }
				<FormControl componentClass="select"
				             value={this.state.voter[name] || ''}
				             onChange={(e) => this.onChange(name, e.target.value)}>
					<option value="" />
					{ options.map( (item, i) => (<option key={i} value={item}>{item}</option>) ) }
				</FormControl>
				{ !this.state.validation[name] && <span className="pull-left">* {label} is not valid *</span> }
			</Col>
		);
	};

	onSubmitInner = () => {
		this.validate( () => {
			const voter = {...this.state.voter};
			this.props.onSubmit(voter);
		})
	};

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
			       onHide={onClose}>
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form horizontal>
						<FormGroup>
							<Col md={12}>
								Email
								<FormControl type="email"
								             disabled={disableEmail}
								             onChange={e => this.onChange('email', e.target.value)}
								             value={this.state.voter['email'] || ''} />
								{ !this.state.validation['email'] && <span className="pull-left">* Email is not valid *</span> }
							</Col>
						</FormGroup>
						<FormGroup>
							{ this.renderField('firstname', 'First name') }
							{ this.renderField('lastname', 'Last name') }
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
							{ this.renderField('phonenumber', 'Phone', 'number') }
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
							{ this.renderDropdownField('state', 'State', Object.values(states)) }
							{ this.renderField('city', 'City') }
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Row>
						<Col md={12} className="btn-container">
							<Button className='btn-primary' onClick={this.onSubmitInner}>{submitText}</Button>
							<Button className='btn-primary' onClick={onClose}>Cancel</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		);
	}
}
