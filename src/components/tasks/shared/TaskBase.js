import BaseComponent from '../../shared/BaseComponent';

export default class TaskBase extends BaseComponent {

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateField = (name) => {
        return !!this.state[name];
    }
}