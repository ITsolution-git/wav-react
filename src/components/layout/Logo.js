import React from 'react';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import logo from '../../resources/images/logo.png';

class Logo extends BaseComponent {

    hanldeClick = () => {
      if (!this.isOnBoarding()) {
          this.redirectToHome();
      }
    };

    render() {
        const { width = 100, height = 80 } = this.props;
        return (
            <img onClick={this.hanldeClick}
                 src={logo}
                 alt=""
                 width={width} height={height} />
        )
    }
}

export default withRouter(Logo);