import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from 'react-router-dom'

import { BaseComponent, AddVoters } from '../shared'

class AddVoterToList extends BaseComponent { 
	state = {
		title: 'Add voters to your list',
		description1: 'Add more voters to your list. Select people among your social media friends or search for other people you know among all the voters of your district.',
		description2: 'Try to choose a few among <strong>regular voters</strong>, a few among <strong>infrequent voters</strong>, and a few <strong>unregistered voters</strong>.',
	    votersList: [
	        {
	            id: 1,
	            name: 'Denis Damin 1',
	            phone: '1-541-754-3010',
	            street: 'New work Sr. 1289',
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
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
	            firstName: 'Denis',
				lastName: 'Damin',
	            sex: 'Male',
	            avatar: 'https://images.unsplash.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
	            social: {
	                twitter: true,
	                linkedIn: true,
	                facebook: true
	            },
	            status: 'Regular'
	        }
	    ]
	}

	// click handler when clicking voter wanted
	onSelectVoter = item => {
    	// this.setState({ selectedVoter: item })
    }

	render () {
		// const { title, description1, description2, votersList } = this.state
		return (
			<AddVoters />
		)
	}
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddVoterToList));
