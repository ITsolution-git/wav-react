import React from 'react';
import PubSub from "pubsub-js";
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import BaseComponent from '../../shared/BaseComponent';
import HelpButton from '../shared/HelpButton';
import pubsubConstants from "../../../constants/PubSubConstants";
import Button from '../../shared/Button';

class LeftStepper extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { activeStep: 0 };
    }

    handleNext = () => {
        const { activeStep } = this.state;
        const { steps } = this.props;
        const { nextEnabled, onNext = () => {} } = steps[activeStep];
        PubSub.publish(pubsubConstants.onTaskNext);
        onNext();
        if (nextEnabled !== false) {
            if (activeStep + 1 === steps.length) {
                PubSub.publish(pubsubConstants.onTaskComplete);
                return;
            }
            this.setState({
                activeStep: activeStep + 1,
            });
        }
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    currentCheckpoint = () => {
        const { steps } = this.props;
        return steps.length > 0 && steps[this.state.activeStep];
    };

    render() {
        const { steps = [], taskData = {} } = this.props;
        const { activeStep } = this.state;
        const currentCheckpoint = this.currentCheckpoint();
        return steps.length > 0 ? (
            <div className='btw-stepper'>
                <Row>
                    <Col md={3}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            { steps.map((step, index) => {
                                return (
                                    <Step key={index}>
                                        <StepLabel>{step.label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </Col>
                    <Col md={9}>
                        <div className='stepper-content'>
                            <Row>
                                <Col mdOffset={11} md={1} xsOffset={10}>
                                        <OverlayTrigger placement="bottom"
                                                        triggerType="hover"
                                                        overlay={(<Tooltip id='help-tooltip'>Questions about this task? contact us</Tooltip>)}>
                                            <div>
                                                <HelpButton task={taskData.task_description} checkpoint={currentCheckpoint.label} />
                                            </div>
                                        </OverlayTrigger>
                                </Col>
                            </Row>
                            <div className='input-block'>
                                { currentCheckpoint.component }
                            </div>
                        </div>
                        <Row>
                            <Col mdOffset={3} md={4} xs={6} onClick={this.handleBack}>
                                { activeStep !== 0 && <Button> Back </Button> }
                            </Col>
                            <Col md={4} xs={6} onClick={this.handleNext}>
                                <Button disabled={!currentCheckpoint.valid}>
                                    { activeStep === steps.length - 1 ? 'Finish' : 'Next' }
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        ) : null;
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(withRouter(LeftStepper));