import React from 'react';

import BaseComponent from '../../shared/BaseComponent';
import Logo from '../../layout/Logo';
import colors from '../../../constants/ColorConstants';

export default class OnBoardingLayout extends  BaseComponent {
    resolveDefaultColor = () => {
        return this.isMobile() ? colors.white : colors.blue;
    };

    render() {
        const { color = this.resolveDefaultColor() } = this.props;
        return (
            <div className="btw-voter-layout">
                <div className='logo' >
                    <Logo />
                </div>
                { this.renderBackground(color) }
                { this.props.children }
            </div>
        )
    }
}
