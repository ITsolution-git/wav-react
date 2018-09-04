import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import OnBoardingLayout from './shared/OnBoardingLayout'


export default class WelcomePage extends BaseComponent {
    render() {
        return (
            <OnBoardingLayout>
                <div>welcome</div>
            </OnBoardingLayout>
        );
    }

}
