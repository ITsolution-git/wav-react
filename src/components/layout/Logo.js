import React from 'react';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import logo from '../../resources/images/logo.svg';
import blackLogo from '../../resources/images/logo-black.png';

class Logo extends BaseComponent {

    hanldeClick = () => {
      if (!this.isOnBoarding()) {
          this.redirectToHome();
      }
    };

    render() {
        const { width = 65, height = 44, useBlack = false } = this.props;
        return (
            <img onClick={this.hanldeClick}
                 src={useBlack ? blackLogo : logo}
                 alt=""
                 width={width} height={height} />
        )
    }
}

export default withRouter (Logo);