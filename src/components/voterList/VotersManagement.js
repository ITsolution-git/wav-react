import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import { BaseComponent } from '../shared'
import { VotersList, VoterDetail, FilterBar } from './index'

class VotersManagement extends BaseComponent {
    constructor() {
        super();
        this.state = {
            votersList: [
                {
                    id: 1,
                    name: 'Denis Damin 1',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: false,
                        linkedIn: false,
                        facebook: true
                    },
                    status: 'Infrequent'
                },
                {
                    id: 2,
                    name: 'Denis Damin 2',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Female',
                    avatar: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 3,
                    name: 'Denis Damin 3',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Female',
                    avatar: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 4,
                    name: 'Denis Damin 4',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: false,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 5,
                    name: 'Denis Damin 5',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1554741995-7e71ded4ae1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 6,
                    name: 'Denis Damin 6',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 7,
                    name: 'Denis Damin 7',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 8,
                    name: 'Denis Damin 8',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 9,
                    name: 'Denis Damin 9',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 10,
                    name: 'Denis Damin 10',
                    phone: '1-541-754-3010',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    avatar: 'https://images.unsplash.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                }
            ],
            selectedVoter: {
                id: 1,
                name: 'Denis Damin 1',
                phone: '1-541-754-3010',
                street: 'New work Sr. 1289',
                sex: 'Male',
                avatar: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                social: {
                    twitter: true,
                    linkedIn: true,
                    facebook: true
                },
                status: 'Infrequent',
                tasks: [
                    {
                        id: 1,
                        title: 'Help Dennis Holman',
                        status: 0, // 0: in progress, 1: completed
                        points: 4,
                        start_date: '30 May 2019',
                        end_date: '30 May 2019',
                        description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 
                        I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                    },
                    {
                        id: 5,
                        title: 'Help Dennis Holman',
                        status: 1, // 0: in progress, 1: completed
                        points: 20,
                        start_date: '30 May 2019',
                        end_date: '30 May 2019',
                        description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 
                        I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                    }
                ]
            },
            searchString: ''
        }
    }

    changeStatusHandler = (value) => {
        const { selectedVoter } = this.state;

        this.setState({
            selectedVoter: {
                ...selectedVoter,
                status: value
            }
        })
    }

    render() {
        const { selectedVoter } = this.state;

        return (
            <Container>
                <Row className='text-center'>
                    <Col>
                        <FilterBar {...this.props} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <VotersList {...this.props} />
                    </Col>
                    <Col xs={12} lg={6}>
                        <VoterDetail selectedVoter={selectedVoter} changeStatusHandler={this.changeStatusHandler} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default VotersManagement