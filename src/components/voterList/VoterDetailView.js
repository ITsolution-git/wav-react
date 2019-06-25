import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap'

import { BaseComponent, VoterDetail } from '../shared';

class VoterDetailView extends BaseComponent {
	state = {
		selectedVoter: {
            id: 1,
            name: 'Denis Damin 1',
            phone: '1-541-754-3010',
            street: 'New work Sr. 1289',
            firstName: 'Denis',
			lastName: 'Damin',
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
    	const { selectedVoter } = this.state
    	return (
    		<Row className='no-gutters px-4'>
    			<Col>
			        <VoterDetail 
			        	selectedVoter={selectedVoter} 
			        	changeStatusHandler={this.changeStatusHandler} 
			    	/>
	    		</Col>
	    	</Row>
		)
    }
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VoterDetailView);
