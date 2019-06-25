import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Row, Col, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { BaseComponent, TitleAndDescription } from '../shared'

class AddVoterToList extends BaseComponent { 
	state = {
		title: 'Add voters to your list',
		description1: 'Add more voters to your list. Select people among your social media friends or search for other people you know among all the voters of your district.',
		description2: 'Try to choose a few among regular voters, a few among infrequent voters, and a few unregistered voters.'
	}

	render () {
		const { title, description1, description2 } = this.state
		return (
			<Container className='add-voter-page mt-5'>
				<Row>
					<Col lg={9}>
						<TitleAndDescription title={title} description1={description1} description2={description2}/>
					</Col>
					<Col lg={3}>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddVoterToList));
