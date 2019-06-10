import React from 'react';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import Paper from '../shared/Paper';

class SelectDistrict extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
            <Paper className={'select-disctrict'}>
                <h2 className={'district-title'}>Select voting district</h2>
                <p className={'district-description'}>Enter your ZIP code to find a voting district you are attached to. You can change the district anytime.</p>
                
            </Paper>
        );
    }
}

export default withRouter(SelectDistrict);