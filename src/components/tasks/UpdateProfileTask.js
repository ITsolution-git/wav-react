import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import TaskBase from './shared/TaskBase';
import Stepper from './shared/LetfStepper';
import { getTaskData } from '../../helpers/TaskHelper';
import Dropdown from '../shared/inputs/Dropdown';
import InputText from '../shared/inputs/InputText';
import States from '../../constants/States';
import { getAgeYears } from '../../helpers/InputHelper';
import TaskSuccess from './shared/TaskSuccess';

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
      this.state = {};
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
                return this.renderInput(firstName, 'First Name');
            case lastName:
                return this.renderInput(lastName, 'Last Name');
            case state:
                return this.renderDropdown(state, 'State', Object.keys(States));
            case gender:
                return this.renderDropdown(gender, 'Gender', ['Male', 'Female']);
            case city:
                return this.renderInput(city, 'City');
            case address:
                return this.renderInput(address, 'Address');
            case phoneNumber:
                return this.renderInput(phoneNumber, 'Phone Number', 'phone');
            case dateOfBirth:
                return this.renderDropdown(dateOfBirth, 'Date of Birth', getAgeYears());
            case zipCode:
                return this.renderInput(zipCode, 'Zip Code');
        }
    };

    renderInput = (name, label, type) => {
        return this.formatStep(label, name,
            <InputText label={label}
                       type={type}
                       value={this.state[name]}
                       onChange={val => this.handleChange(name, val)} />
        );
    };

    renderDropdown = (name, label, values) => {
        return this.formatStep(label, name,
            <Dropdown label={label}
                      value={this.state[name]}
                      values={values}
                      onChange={val => this.handleChange(name, val)} />)
    };

    renderContent = (name, input) => {
        const { voter_metaData: {
            firstname,
            lastname,
            city,
            state
        } } = this.props.taskData || {};

        return (
            <React.Fragment key={name}>
                { this.isVoterTask()
                    && <Typography gutterBottom>
                        { firstname } { lastname } from { city }, { state } needs to have the following information about them updated
                       </Typography>
                }
                <FormLabel>
                    { input }
                </FormLabel>
            </React.Fragment>
        )
    };

    formatStep = (label, name, input) => {
        return {
            label,
            component: this.renderContent(name, input),
            valid: this.validateField(name)
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

        return [ ...fields.map(this.resolveStepData), {
            label: 'Success',
            component: <TaskSuccess data={this.getTaskData()} />,
            valid: true }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props,
            type = taskData.captain_metaData ? 'captain_metaData' : 'voter_metaData';
        return { [type]: this.state, taskid: taskData._id };
    };

    isVoterTask = () => {
        const { taskData = {}} = this.props;
        return !!taskData.voter_metaData;
    };

    render() {
        return (
            <div className='btw-task container'>
                <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps)
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateProfileTask));