import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';
import { checkForUniqueEmail } from "../../../actions/ErrorAction";
import errorTypes from '../../../constants/ErrorTypesConstants';

class EmailInput extends InputBase {

    checkForUniqueEmail = (e) => {
        const { isVoter = true } = this.props,
            role = isVoter ? 'voter' : 'user';
        this.props.actions.checkForUniqueEmail(e.target.value, role);
    };

    render () {
        const { error } = this.props;
        return <TextInput label='Email'
                          type='email'
                          customError={error}
                          onInputChange={this.checkForUniqueEmail}
                          validator={value => validate(validationTypes.email, value)}
                          name={fields.email}
                          {...this.props } />
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.error[errorTypes.emailExists]
    }
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ checkForUniqueEmail }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailInput);