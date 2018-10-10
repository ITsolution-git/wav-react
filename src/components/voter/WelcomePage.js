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
            ? <div>
		        <div className="title-32-light-blue">
			        HERE'S HOW IT WORKS ...
		        </div>
		        <br />
                <div>Check to see if your friends are registered.</div>
		        <br />
                <div>Receive a customized set of steps for you to help your friends register and vote.
                    Don’t worry we’ll provide you all the info and guidance you need!</div>
		        <br />
		        <div>Track your impact as you help your friends vote</div>
              </div>
            : <div>
		        <div className="title-32-light-blue">
			        WELCOME TO THE TEAM!
		        </div>
                <br />
                You’re a part of a national movement to make sure no one sits this election out
            </div>;
        return (
            <OnBoardingLayout color={colors.blue}>
                <div className="layout-center">
                    <div className='welcome-div'>

                        <div className="title-20-blue" id="how-it-works">
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