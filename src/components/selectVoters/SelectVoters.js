import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import ContentLayout from '../layout/ContentLayout';

class SelectVoters extends BaseComponent {
    constructor() {
        super();
        this.state = {
            voterLists: null
        }
    }

    render() {
        return (
            <ContentLayout>
                <div className='btw-select-voters'>
                    <div className='content'>
                        <div className='title'>Add 10 voters to your list</div>
                        <div className='description'>
                            Select 10 people among your social media friends or search
                            for other people you know among all the voters of your district.
                            Try to choose a few among regular voters, a few among infrequent voters,
                            and a few unregistered voters.
					    </div>
                    </div>
                </div >
            </ContentLayout>
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(SelectVoters));