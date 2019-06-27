import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container
} from 'react-bootstrap';

import { Logo, BaseComponent } from '../../shared';
import { getHomeRoute } from '../../../helpers/AuthHelper';
import HeaderProfileDropdown from '../components/HeaderProfileDropdown';

class OnBoardingHeader extends BaseComponent {
    render() {
        return (
            <Container className='btw-off-header' >
                <div className='d-flex justify-content-between'>
                    <div className='btw-header-logo'>
                        <Link to={getHomeRoute()}><Logo /></Link>
                    </div>
                    <HeaderProfileDropdown />
                </div>
            </Container>
        )
    }
}

export default OnBoardingHeader;