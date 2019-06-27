import React from 'react';
import {
    Container
} from 'react-bootstrap';

import { Logo, BaseComponent, ConfirmationDialog } from '../../shared';
import HeaderProfileDropdown from '../components/HeaderProfileDropdown';

class OnBoardingHeader extends BaseComponent {
    state = {
        showAlertModal: false
    };

    handleAlertSubmit = () => {
        this.action();
    };

    hideAlertModal = () => {
        this.setState({ showAlertModal: false });
    };

    handleActionClick = action => {
        this.action = action;
        this.setState({ showAlertModal: true })
    };

    handleLogoClick = () => {
      this.handleActionClick(this.redirectToHome);
    };

    render() {
        const { showAlertModal } = this.state;

        return (
            <Container className='btw-off-header' >
                <div className='d-flex justify-content-between'>
                    <div className='btw-header-logo'>
                        <Logo onClick={this.handleLogoClick} />
                    </div>
                    <HeaderProfileDropdown onActionClick={this.handleActionClick} />
                </div>
                <ConfirmationDialog show={showAlertModal}
                                    onSubmit={this.handleAlertSubmit}
                                    description={`Warning! If you leave the onboarding you'll be required to pick up where you left.`}
                                    onClose={this.hideAlertModal} />
            </Container>
        )
    }
}

export default OnBoardingHeader;