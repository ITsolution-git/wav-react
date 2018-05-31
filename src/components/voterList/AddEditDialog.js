import React from 'react';
import {
	Row,
	Col,
	Form
} from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import Dialog from '../shared/Dialog';
import Button from '../shared/Button';
import fieldConstants from '../../constants/FieldConstants';
import {
	FirstNameInput,
	LastNameInput,
    CityInput,
    StateInput,
    EmailInput,
    DateOfBirthInput,
    GenderInput,
    AddressInput,
    PhoneInput,
	ZipCodeInput
} from '../shared/validatedInputs';


export default class AddEditDialog extends BaseComponent {

	componentWillMount() {
        this.initState();
	}

    handleChange = (value, isValid, name) => {
        this.setState(state => {
            const { voter, valid } = state;
            return {
                voter: { ...voter, [name]: value },
                valid: { ...valid, [name]: isValid }
            }
        });
    };

	onSubmitInner = () => {
		this.setState({ startValidation: true });
        const { voter, valid } = this.state;
        const isValid = Object.values(valid).every(val => val);
        if (isValid) {
            this.props.onSubmit(voter);
            this.initState();
		}
	};

	initState = () => {
		const { voter = {} } = this.props;

		this.setState({
			startValidation: false,
			voter : voter,
			valid: {
                [fieldConstants.firstName]: false,
                [fieldConstants.lastName]: false,
                [fieldConstants.city]: false,
                [fieldConstants.state]: false,
                [fieldConstants.email]: false
			}
		})
	};

	onCloseDialog = () => {
		const { onClose } = this.props;
		this.initState();
		onClose();
	};

	render() {
		const {
			show,
		    submitText,
		    title='',
		    disableEmail = false
		  } = this.props;

		const {
			voter,
            startValidation
		} = this.state;

		return (
			<Dialog show={show}
					title={title}
					actionButtons={
						<Row>
							<Col md={3}>
                                <Button size='medium' onClick={this.onCloseDialog}>Cancel</Button>
							</Col>
                            <Col md={3}>
                                <Button size='medium' onClick={this.onSubmitInner}>{submitText}</Button>
                            </Col>
						</Row>
					}
					onClose={this.onCloseDialog}>
					<Form horizontal>
                        { this.renderRequiredFieldMsg() }
						<Row>
							<Col md={6}>
								<FirstNameInput onChange={this.handleChange}
												startValidation={startValidation}
												defaultValue={voter[fieldConstants.firstName]}
												required />
							</Col>
							<Col md={6}>
								<LastNameInput onChange={this.handleChange}
											   startValidation={startValidation}
										       defaultValue={voter[fieldConstants.lastName]}
											   required />
							</Col>
						</Row>
						<Col>
							<AddressInput onChange={this.handleChange}
										  startValidation={startValidation}
										  defaultValue={voter[fieldConstants.address]} />
						</Col>
						<Col>
							<DateOfBirthInput onChange={this.handleChange}
											  startValidation={startValidation}
										      defaultValue={voter[fieldConstants.dateOfBirth]}/>
						</Col>
						<Row>
							<Col md={6}>
								<CityInput onChange={this.handleChange}
										   startValidation={startValidation}
										   defaultValue={voter[fieldConstants.city]}
										   required />
							</Col>
							<Col md={6}>
								<StateInput onChange={this.handleChange}
											startValidation={startValidation}
											defaultValue={voter[fieldConstants.state]}
											required />
							</Col>
						</Row>
						<Row>
                            <Col md={6}>
                                <EmailInput onChange={this.handleChange}
                                            startValidation={startValidation}
                                            defaultValue={voter[fieldConstants.email]}
                                            required
                                            disabled={disableEmail} />
                            </Col>
							<Col md={6}>
								<ZipCodeInput onChange={this.handleChange}
											  startValidation={startValidation}
											  defaultValue={voter[fieldConstants.zipCode]} />
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<GenderInput onChange={this.handleChange}
											 startValidation={startValidation}
											 defaultValue={voter[fieldConstants.gender]} />
							</Col>
							<Col md={6}>
								<PhoneInput onChange={this.handleChange}
											startValidation={startValidation}
											defaultValue={voter[fieldConstants.phone]} />
							</Col>
						</Row>
					</Form>
			</Dialog>
		);
	}
}
