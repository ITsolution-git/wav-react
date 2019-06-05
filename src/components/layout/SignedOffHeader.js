import React from 'react';
import { AppBar } from '@material-ui/core';

import Logo from './Logo';

const SignedOffHeader = () => {
    return (
        <div className='btw-off-header'>
            <AppBar position='static'>
                    <Logo />
            </AppBar>
        </div>
    )
};

export default SignedOffHeader;