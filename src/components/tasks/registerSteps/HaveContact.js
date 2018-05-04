import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';
import appDataTypes from '../../../constants/AppDataTypes';
import RadioButtons from '../../shared/inputs/RadioButtons';
import { RegisterTaskConstants, RegisterSubSteps } from '../../../constants/reducerConstants/TaskConstants';
import PubSub from "pubsub-js";
import pubsubConstants from "../../../constants/PubSubConstants";
import routes from '../../../constants/Routes';

const options = {
    yes: 'yes',
    no: 'no'
};


class SharedComponent extends BaseComponent {
    getValues = () => {
        return [
            { value: options.yes, label: 'Yes' },
            { value: options.no, label: 'No'}
        ]
    };

    renderYesNo = (text, type) => {
        const {
            onChange,
            value = ''
        } = this.props;
        return (
            <div>
                <Typography gutterBottom>
                    { text }
                </Typography>
                <RadioButtons title=''
                              onChange={val => onChange(type, val)}
                              value={value}
                              values={ this.getValues() } />
            </div>
        );
    };

    checkForNo = () => {
        if (this.props.value === options.no) {
            this.onLink(routes.tasksList);
            return;
        }
    };

    componentWillUnmount() {
        PubSub.unsubscribe(this.taskSubscription);
    }
}

export default class HaveContact extends SharedComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskNext, type => {
            this.checkForNo();
            this.props.onSubmit(RegisterSubSteps.firstYes);
        });
    }

    render() {

        const {
            voterData: {
                firstname = '',
                lastname = '',
            }
        } = this.props;

        return this.renderYesNo(`Did you speak with ${firstname} ${lastname} ?`, RegisterTaskConstants.hasSpeak);
    }
}


export class FirstYes extends SharedComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskNext, type => {
            this.checkForNo();
            this.props.onSubmit(RegisterSubSteps.secondYes);
        });
    }

    render () {
        const {
            voterData: {
                firstname = '',
                lastname = '',
            }
        } = this.props;

        return this.renderYesNo(`Did ${firstname} ${lastname} think they were registered to vote?`, RegisterTaskConstants.thinkRegistered);
    }
}

export class SecondYes extends SharedComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskNext, type => {
            this.props.onSubmit(RegisterSubSteps.firstNext);
        });
    }

    render () {
        const {
            voterData: {
                firstname = '',
                lastname = '',
            }
        } = this.props;
        return (
            <div>
                <Typography gutterBottom>
                    Ask { firstname } { lastname } to check directly on Vote.org and let you know the results. If they can, have them take a screenshot and send it to you.
                </Typography>
            </div>
        )
    }
}

export class FirstNext extends SharedComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskNext, type => {
            if (this.props.value === options.no) {
                this.props.onSubmit(RegisterSubSteps.firstNo);
                return;
            }
        });
    }

    render () {
        const {
            voterData: {
                firstname = '',
                lastname = '',
            }
        } = this.props;
        return this.renderYesNo(`Could ${firstname} ${lastname} confirm they were registered on Vote.org?`, RegisterTaskConstants.confirmRegistered);
    }
}

export class FirstNo extends SharedComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskNext, type => {
            this.props.onSubmit(RegisterSubSteps.secondNext);
        });
    }

    render () {
        const {
            voterData: {
                firstname = '',
                lastname = '',
            }
        } = this.props;
        return (
            <div>
                <Typography gutterBottom>
                    Tell { firstname } { lastname } to register on Vote.org and let you know afterward. If you can, have  { firstname } { lastname } forward you the confirmation email or screenshot.
                </Typography>
            </div>
        )
    }
}


export class SecondNext extends SharedComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskNext, type => {
            this.checkForNo();
        });
    }

    render () {
        const {
            voterData: {
                firstname = '',
                lastname = '',
            }
        } = this.props;
        return this.renderYesNo(`Did  ${firstname} ${lastname} confirm that they registered to vote?`, RegisterTaskConstants.finalConfirmRegistered);
    }
}