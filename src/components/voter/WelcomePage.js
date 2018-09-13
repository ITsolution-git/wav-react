import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import OnBoardingLayout from './shared/OnBoardingLayout'
import Button from '../shared/Button';
import colors from '../../constants/ColorConstants';
import routes from '../../constants/Routes';

class WelcomePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            nextEnabled: false
        }
    }

    onNext = () => {
        this.setState({ nextEnabled: true });
    };

    onGetStarted = () => {
        this.onLink(routes.makelist);
    };

    renderRadio = (active) => {
      return (
          <div className={classnames('radio', { active })} />
      )
    };

    render() {
        const { nextEnabled } = this.state;
        const contentMsg = nextEnabled
            ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            : 'We think this is the start of a beautiful friendship. Speaking of friends...';
        return (
            <OnBoardingLayout color={colors.blue}>
                <div className="layout-center">
                    <div className='welcome-div'>
                        <div className="title-32-light-blue">
                            WELCOME TO THE TEAM!
                        </div>
                        <div className="title-20-blue" id="how-it-works">
                            How it works...
                        </div>
                        <div className="text-18-dark-blue">
                            { contentMsg }
                        </div>
                        <div id="btn-next">
                            { nextEnabled
                                ? <Button onClick={this.onGetStarted}>Get Started!</Button>
                                : <Button onClick={this.onNext}>Next</Button>
                            }
                            <div id="radio-view">
                                { this.renderRadio(!nextEnabled) }
                                { this.renderRadio(nextEnabled) }
                            </div>
                        </div>
                    </div>
                </div>
            </OnBoardingLayout>
        );
    }
}

export default withRouter(WelcomePage);