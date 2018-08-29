import React from 'react';
import Logo from './Logo';
import BaseComponent from '../shared/BaseComponent';
class MobileLogo extends BaseComponent {
    render() {
        return this.isMobile()
            ? <div id="mobile-logo">
                <Logo />
            </div>
            : null
    }
}

export default MobileLogo;