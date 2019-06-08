import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import Checkbox from '../shared/Checkbox';
import ContentLayout from '../layout/ContentLayout';

class SelectVoters extends BaseComponent {
    constructor() {
        super();
        this.state = {
            voterLists: null
        }
    }

    checkHandler = (event) => {
        const { checked } = event.target;
    }

    render() {
        return (
            <ContentLayout>
                <div className='btw-select-voters container'>
                    <Row>
                        <Col xs={12}>
                            <div className='title'>Add 10 voters to your list</div>
                            <div className='description'>
                                Select 10 people among your social media friends or search
                                for other people you know among all the voters of your district.
                                Try to choose a few among regular voters, a few among infrequent voters,
                                and a few unregistered voters.
					        </div>
                            <Checkbox onChange={(event) => this.checkHandler(event)} label='test check' />
                        </Col>
                    </Row>
                </div >
            </ContentLayout>
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(SelectVoters));