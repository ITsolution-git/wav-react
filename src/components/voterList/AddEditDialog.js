import React from 'react';
import {
	Row,
	Col
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
    AddressInput
} from '../shared/validatedInputs';
import Icon from '../shared/Icon';

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

	onSubmitInner = (submitFunction) => {
		this.setState({ startValidation: true });
        const { voter, valid } = this.state;
        const isValid = Object.values(valid).every(val => val);
        if (isValid) {
            submitFunction(voter);
            this.initState();
		}
	};

	initState = () => {
		const { voter = {}, isEdit } = this.props;

		this.setState({
			startValidation: false,
			voter : voter,
			valid: {
                [fieldConstants.firstName]: isEdit,
                [fieldConstants.lastName]: isEdit,
                [fieldConstants.city]: isEdit,
                [fieldConstants.state]: isEdit,
                [fieldConstants.email]: isEdit
			}
		})
	};

	onCloseDialog = () => {
		const { onClose } = this.props;
		this.initState();
		onClose();
	};

	getViewProps = () => {
		if (this.isDesktop()) {
			return {
				titleClass: 'title-24-blue'
			}
		}
		return {
            titleClass: 'title-24-light-blue'
		}
	};

	componentWillReceiveProps(props) {
	    if (props.voter && JSON.stringify(props.voter) !== JSON.stringify(this.state.voter)) {
	        this.setState({ voter: props.voter });
        }
    }

	render() {
		const {
			show,
		    title='',
            isEdit = false,
		    disableEmail = false,
            onAdd = () => {},
            onDelete = () => {},
            onUpdate = () => {}
		  } = this.props;

		const {
			voter,
            startValidation
		} = this.state;

		const viewProps = this.getViewProps();

		return (
			<Dialog show={show}
					onClose={this.onCloseDialog}>
					<div id="add-voter-modal">
                            <Row id="title-row">
                                <Col md={6}>
                                    <div className={viewProps.titleClass}>{ title }</div>
                                </Col>
                                <Col md={6} className="pull-right">
                                    <div id="close-icon">
                                        <Icon onClick={this.onCloseDialog} name="close-black" width="30px" height="30px" />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FirstNameInput onChange={this.handleChange}
                                                    disabled={isEdit}
                                                    startValidation={startValidation}
                                                    defaultValue={voter[fieldConstants.firstName]}
                                                    required />
                                </Col>
                                <Col md={6}>
                                    <LastNameInput onChange={this.handleChange}
                                                   disabled={isEdit}
                                                   startValidation={startValidation}
                                                   defaultValue={voter[fieldConstants.lastName]}
                                                   required />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <EmailInput onChange={this.handleChange}
                                                startValidation={startValidation}
                                                defaultValue={voter[fieldConstants.email]}
                                                required
                                                disabled={disableEmail} />
                                </Col>
                            </Row>
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
                                    <DateOfBirthInput onChange={this.handleChange}
                                                      startValidation={startValidation}
                                                      defaultValue={voter[fieldConstants.dateOfBirth]}/>
                                </Col>
                                <Col md={6}>
                                    <AddressInput onChange={this.handleChange}
                                                  startValidation={startValidation}
                                                  defaultValue={voter[fieldConstants.address]} />
                                </Col>
							</Row>
                            <div id="buttons">
                                { isEdit
                                    ? <Row>
                                        <Row>
                                            <Button onClick={() => this.onSubmitInner(onUpdate)} color="blue">Update</Button>
                                        </Row>
                                        <Row>
                                            <Button onClick={onDelete} color="red">Delete</Button>
                                        </Row>
                                    </Row>
                                    : <Row>
                                        <Button onClick={() => this.onSubmitInner(onAdd)} color="blue">Add</Button>
                                    </Row> }
                            </div>
					</div>
			</Dialog>
		);
	}
}
