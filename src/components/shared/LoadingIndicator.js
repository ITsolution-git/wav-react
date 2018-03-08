
import React, { Component } from 'react';



class LoadingIndicator extends Component {

	render() {
		return (
			<div className="btw-container preloader-wrapper small active">
				<div className="spinner-layer spinner-green-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
					<div className="circle"></div>
				</div><div className="circle-clipper right">
					<div className="circle"></div>
				</div>
				</div>
			</div>
		);
	}
}

export default LoadingIndicator;
