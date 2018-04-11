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
    phoneNumber: 'phonenumber',
    dateOfBirth: 'dateofbirth',
    zipCode: 'zipcode'
};

class UpdateProfileTask extends TaskBase {

    resolveStepData = (field) => {
        switch (field) {
            case fieldTypes.firstName: {
                const label = 'First Name';
                return this.formatStep(label, <InputText label={label} />);
            }
            case fieldTypes.lastName: {
                const label = 'Last Name';
                return this.formatStep(label, <InputText label={label} />);
            }
            case fieldTypes.state: {
                const label = 'State',
                      parsedStates = Object.keys(States);
                return this.formatStep(label, <Dropdown label={label} values={parsedStates} />);
            }
            case fieldTypes.gender: {
                const label = 'Gender';
                return this.formatStep(label, <Dropdown label={label} values={['Male', 'Female']} />);
            }
            case fieldTypes.city: {
                const label = 'City';
                return this.formatStep(label, <InputText label={label} />);
            }
            case fieldTypes.phoneNumber: {
                const label = 'Phone Number';
                return this.formatStep(label, <InputText label={label} />);
            }
            case fieldTypes.dateOfBirth: {
                const label = 'Date of Birth';
                return this.formatStep(label, <Dropdown label={label} values={getAgeYears()} />)
            }
            case fieldTypes.zipCode: {
                const label = 'Zip Code';
                return this.formatStep(label, <InputText label={label} />);
            }
            default: {
                return {};
            }
        }
    };

    formatStep = (label, input) => {
       return {
           label,
           component: this.renderContent(input)
       }
    };

    renderContent = (input) => {
        return (
            <Grid alignItems='center'
                  justify='center'
                  container
                  direction='column'>
                <FormLabel>
                    { input }
                </FormLabel>
            </Grid>
        )
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
                <Stepper steps={this.getSteps()} />
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