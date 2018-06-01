import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Typography from '@material-ui/core/Typography';
import { Row, Col } from 'react-bootstrap';

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from '../../helpers/TaskHelper';
import TaskSuccess from './shared/TaskSuccess';

import imgPhone from '../../resources/images/phone.png'
import imgReward from '../../resources/images/reward.png'
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
                return this.renderInput(city, 'City', <CityInput onChange={this.onChange} required  />);
            case address:
                return this.renderInput(address, 'Address', <AddressInput onChange={this.onChange} required />);
            case phoneNumber:
                return this.renderInput(phoneNumber, 'Phone Number', <PhoneInput onChange={this.onChange} required />);
            case dateOfBirth:
                return this.renderInput(dateOfBirth, 'Date of Birth', <DateOfBirthInput onChange={this.onChange} required />);
            case zipCode:
                return this.renderInput(zipCode, 'Zip Code', <ZipCodeInput onChange={this.onChange} required />);
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
                { this.renderRequiredFieldMsg() }
                    { this.isVoterTask()
                    && <Typography gutterBottom>
                        { firstname } { lastname } from { city }, { state } needs to have the following information about them updated
                    </Typography>
                    }
                <div className='input-field-div'>
                    <div className='input-field'>{ input }</div>
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

        return [ ...fields.map(this.resolveStepData), {
            label: 'Success',
            component: <TaskSuccess data={this.getTaskData()} />,
            valid: true }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props,
            type = taskData.captain_metaData ? 'captain_metaData' : 'voter_metaData';
        return { [type]: this.state, taskid: taskData._id, points: taskData.group_info.value };
    };

    isVoterTask = () => {
        const { taskData = {}} = this.props;
        return !!taskData.voter_metaData;
    };

    render() {
        return (
            <div className='btw-task container'>
                { this.renderBackToHome() }
                <Row>
                    <Col md={8}>
                        <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                    </Col>

                    <Col 
                        md={3} 
                        xs={ this.isMobile() ? 12 : 8 } 
                        xsOffset={ this.isMobile() ? 1 : 0 } 
                        className="btw-task-info" 
                        style={{marginLeft: (this.isMobile() ? "0" : "80px")}}>
                        <Row className="section">
                            <Col xs={2}>
                                <img src={imgReward} alt="" width={40} height={40} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Rewards Points</b></span><br />
                                <span className="description">This task is worth {this.props.taskData.group_info.value} points</span>
                            </Col>
                        </Row>

                        <hr />

                        <Row className="section">
                            <Col xs={2}>
                                <img src={imgPhone} alt="" width={40} height={40} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Need help?</b></span><br />
                                <span className="description">hi@bethewave.vote</span><br/>
                                <span className="description">(707) 408-8437</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(UpdateProfileTask));