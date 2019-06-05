import React from 'react';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import logo from '../../resources/images/logo.svg';

class Logo extends BaseComponent {

    hanldeClick = () => {
      if (!this.isOnBoarding()) {
          this.redirectToHome();
      }
    };

    render() {
        const { width = 65, height = 44 } = this.props;
        return (
            <img onClick={this.hanldeClick}
                 src={logo}
                 alt=""
                 width={width} height={height} />
        )
    }
}

export default withRouter (Logo);