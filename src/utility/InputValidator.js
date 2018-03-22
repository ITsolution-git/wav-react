import {
    dateValidation,
    emailValidation,
    passwordValidation,
    phoneValidation,
    zipCodeValidation
} from './FormValidation';
import validationTypes from '../constants/ValidationTypes';

export function validate(type, value) {
    switch (type) {
        case validationTypes.email:
            return emailValidation(value);
        case validationTypes.password:
            return passwordValidation(value);
        case validationTypes.date:
            return dateValidation(value);
        case validationTypes.phone:
            return phoneValidation(parseInt(value));
        case validationTypes.zip:
            return zipCodeValidation(value);
        default:
            return true;
    }
}