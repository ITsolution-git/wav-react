import React from 'react';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import routes from '../../../constants/Routes';


import BaseComponent from '../../shared/BaseComponent';

class LeftStepper extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeStep: 0
        }
    }

    handleNext = () => {
        const { activeStep } = this.state;
        if (activeStep + 1 === this.props.steps.length) {
            this.onLink(routes.tasksList);
            return;
        }
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    render() {
        const { steps = [] } = this.props;
        const { activeStep } = this.state;

        return (
            <div className='btw-stepper'>
                <Row>
                    <Col md={3}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            { steps.map((step, index) => {
                                return (
                                    <Step key={index} classes={{ root: 'stepper-circle'}}>
                                        <StepLabel classes={{label: 'stepper-label'}}>{step.label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </Col>
                    <Col md={9} className='stepper-content'>
                        { steps[activeStep].component }
                    </Col>
                </Row>
                <div>
                    <Row>
                        <Col mdOffset={5} md={3} xs={6} onClick={this.handleBack}>
                            <Button> Back </Button>
                        </Col>
                        <Col md={4} xs={6} onClick={this.handleNext}>
                            <Button> { activeStep === steps.length - 1 ? 'Finish' : 'Next' } </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(LeftStepper);