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
			'isValid' : false
		}
	}

	validateInput(name, value) {
		if (name === 'email') {
			return validate(name, value);
		}
		return ['firstname', 'lastname', 'state', 'city'].includes(name)
			? !!value
			: true;
	}

	validate() {
		let fields = ['firstname', 'lastname', 'state', 'city', 'email'];
		let isValid = true;

		for (let key in fields) {
			isValid = isValid && this.validateInput(fields[key], this.state.voter[fields[key]]);
		}

		this.setState({ 'isValid' : isValid });
	}

	onChange(name, value) {

		let voter = Object.assign({}, this.state.voter);
		voter[name] = value;
		this.setState({'voter' : voter}, () => {
			this.validate();
		});
	}

	renderField = (name, label) => {
		return (
			<Col md={6}>
				{ label }
				<FormControl type="text"
				             value={this.state.voter[name] || ''}
				             onChange={(e) => this.onChange(name, e.target.value)}/>
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
			</Col>
		);
	};

	onSubmitInner = () => {
		const { _id, ...voter } = this.state.voter;
		voter.userid = _id;
		this.props.onSubmit(voter);
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
							{ this.renderField('phonenumber', 'Phone') }
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
							<Button className='btn-primary' disabled={!this.state.isValid} onClick={this.onSubmitInner}>{submitText}</Button>
							<Button className='btn-primary' onClick={onClose}>Cancel</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		);
	}
}
