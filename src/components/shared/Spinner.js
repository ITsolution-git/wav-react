import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import BaseComponent from './BaseComponent';


class Spinner extends BaseComponent {
	render() {
		const { loading, height = 100, size = 70 } = this.props;
		return loading ?
			( <div className='btw-spinner' style={{ height: height }}>
				 <CircularProgress  size={size} />
			  </div> )
			: null
	}
}

export default Spinner;
