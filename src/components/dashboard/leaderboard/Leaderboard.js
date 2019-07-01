import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class Leaderboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            performers: [
                {
                    id: 1,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 35,
                    activeTasks: 6,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 2,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 65,
                    activeTasks: 56,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 3,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 45,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
            ],
        }
    }

    render() {
        return (
            <Container className='btw-leaderboard'>
                <div className='page-header'>
                    <Typography variant='body' className='header-url'>
                        Home  /  <span>Leaderboard</span>
                    </Typography>
                    <Typography className='title'>
                        Leaderboard
                        <SvgIcon name='place-1' className='gold-medal' />
                    </Typography>
                </div>
            </Container>
        )
    }
}

export default connect()(withRouter(Leaderboard));
