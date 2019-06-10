import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from '../../helpers/TaskHelper';
import TaskSuccess from './shared/TaskSuccess';
import ContentLayout from '../layout/ContentLayout';

import {
    FirstNameInput,
    LastNameInput,
    StateInput,
    GenderInput,
    CityInput,
    AddressInput,
    PhoneInput,
    DateOfBirthInput,
    ZipCodeInput
} from '../shared/validatedInputs';
import fieldConstants from '../../constants/FieldConstants';
import InformationSection from './shared/InformationSection';
import BottomButtons from './shared/BottomButtons';

const fieldTypes = {
    firstName: 'firstname',
    lastName: 'lastname',
    state: 'state',
    gender: 'gender',
    city: 'city',
    address: 'address',
    phoneNumber: 'phonenumber',
    dateOfBirth: 'dateofbirth',
    zipCode: 'zipcode'
};



class UpdateProfileTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: {}
        };
    }

    resolveStepData = (field) => {
        const {
            firstName,
            lastName,
            state,
            gender,
            city,
            address,
            phoneNumber,
            dateOfBirth,
            zipCode
        } = fieldTypes;
        switch (field) {
            case firstName:
                return this.renderInput(firstName, 'First Name', <FirstNameInput onChange={this.onChange} required />);
            case lastName:
                return this.renderInput(lastName, 'Last Name', <LastNameInput onChange={this.onChange} required />);
            case state:
                return this.renderInput(state, 'State', <StateInput onChange={this.onChange} required />);
            case gender:
                return this.renderInput(gender, 'Gender', <GenderInput onChange={this.onChange} required />);
            case city:
                return this.renderInput(city, 'City', <CityInput onChange={this.onChange} required />);
            case address:
                return this.renderInput(address, 'Address', <AddressInput onChange={this.onChange} required />);
            case phoneNumber:
                return this.renderInput(phoneNumber, 'Phone Number', <PhoneInput onChange={this.onChange} required />);
            case dateOfBirth:
                return this.renderInput(dateOfBirth, 'Date of Birth', <DateOfBirthInput onChange={this.onChange} required />);
            case zipCode:
                return this.renderInput(zipCode, 'Zip Code', <ZipCodeInput onChange={this.onChange} required />);
            default:
                break;
        }
    };

    onChange = (value, isValid, name) => {
        this.setState(state => {
            const { valid } = state;
            name = name === fieldConstants.zipCode ? fieldTypes.zipCode : name;
            return {
                [name]: value,
                valid: { ...valid, [name]: isValid }
            }
        });
    };

    renderInput = (name, label, input) => {
        return this.formatStep(label, name, input);
    };

    renderContent = (name, input) => {
        const { voter_metaData: {
            firstname,
            lastname,
            city,
            state
        } } = this.props.taskData || {};

        return (
            <div key={name} className='update-profile'>
                {this.renderRequiredFieldMsg()}
                {this.isVoterTask()
                    && <div>
                        {firstname} {lastname} from {city}, {state} needs to have the following information about them updated
                    </div>
                }
                <div className='input-field-div'>
                    <div className='input-field'>{input}</div>
                </div>
            </div>
        )
    };

    formatStep = (label, name, input) => {
        return {
            label,
            component: this.renderContent(name, input),
            valid: this.state.valid[name]
        }
    };

    getSteps = () => {
        const {
            captain_metaData = [],
            voter_metaData = {}
        } = this.props.taskData || {};

        const fields = captain_metaData.length > 0
            ? captain_metaData
            : voter_metaData.fields || [];

        return [...fields.map(this.resolveStepData), {
            label: 'Success',
            component: <TaskSuccess data={this.getTaskData()} />,
            valid: true
        }
        ];
    };

    getTaskData = () => {
        const { taskData = {} } = this.props,
            type = taskData.captain_metaData ? 'captain_metaData' : 'voter_metaData';
        return { [type]: this.state, taskid: taskData._id, points: taskData.group_info.value };
    };

    isVoterTask = () => {
        const { taskData = {} } = this.props;
        return !!taskData.voter_metaData;
    };

    render() {

        if (!this.props.taskData && this.props.tasks.length === 0) {
            return ''
        }

        if (!this.props.taskData && this.props.tasks.length > 0) {
            this.props.history.push('/errorPages/No_Task')
            return ''
        }

        return (
            <ContentLayout>
                <div className='btw-task container'>
                    <Row>
                        <Col md={8}>
                            <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                        </Col>
                        <InformationSection taskData={this.props.taskData} />
                        <BottomButtons taskData={this.props.taskData} />
                    </Row>
                </div>
            </ContentLayout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps),
        tasks: state.taskList.tasks
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(UpdateProfileTask));