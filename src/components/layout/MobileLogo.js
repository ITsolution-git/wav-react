import React from 'react';
import { renderLogo } from './HeaderHelper';
import BaseComponent from '../shared/BaseComponent';
class MobileLogo extends BaseComponent {
    render() {
        return this.isMobile()
            ? <div id="mobile-logo">
                {renderLogo()}
            </div>
            : null
    }
}

export default MobileLogo;