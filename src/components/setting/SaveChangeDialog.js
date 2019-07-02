import React from 'react';
import PropTypes from 'prop-types'

import { Dialog, Button } from '../shared'

const SaveChangeModal = props => (
	<Dialog
		className='btw-account-modal'
		show={props.open}
		onClose={props.onClose}
		title='Changes Not Saved'
		actionButtons={[
			<Button key='btn-1' size='medium' onClick={props.onSave} className={'primary'}>Stay on This Page</Button>,
			<Button key='btn-2' size='medium' color='white' onClick={props.onClose} className={'secondary leave'}>Leave This Page</Button>	
		]}
		closeButton
	>
		The changes you made to your profile won't be saved if you leave this page.
	</Dialog>
)


SaveChangeModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onSave: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
}

SaveChangeModal.defaultProps = {
	open: false
}

export default SaveChangeModal;