import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';

import TaskBase from './shared/TaskBase';
import Stepper from './shared/LetfStepper';
import { getTaskData } from '../../helpers/TaskHelper';
import Dropdown from '../shared/inputs/Dropdown';
import InputText from '../shared/inputs/InputText';
import States from '../../constants/States';
import { getAgeYears } from '../../helpers/InputHelper';

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
        return (
            <Grid key={name}>
                <FormLabel>
                    { input }
                </FormLabel>
            </Grid>
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
        const {captain_metaData = [], voter_metaData = {}} = this.props.taskData || {};
        const fields = captain_metaData.length > 0
            ? captain_metaData
            : voter_metaData.fields || [];

        return fields.map(this.resolveStepData);
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