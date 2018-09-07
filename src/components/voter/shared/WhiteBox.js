import React from 'react';

import BaseComponent from '../../shared/BaseComponent'
import OnBoardingLayout from './OnBoardingLayout';

export default class WhiteBox extends BaseComponent {
    render() {
        return (
            <OnBoardingLayout showLogo={false}>
                <div className='layout-center vertical-align'>
                    <div className='white-box'>
                        { this.props.children }
                    </div>
                </div>
            </OnBoardingLayout>
        );
    }
}
