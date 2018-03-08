import React, {Component} from 'react';
import {connect} from 'react-redux'
import IdentityAction from "../../actions/IdentityAction";
import YouTube from "react-youtube";

import '../../resources/captainProfile/makelist.css'
class Makelist extends Component {


	constructor() {
		super();
		this.state = {
			makelistNames:{
				firstname1      : '',
				lastname1       : '',
				firstname2      : '',
				lastname2       : '',
				firstname3      : '',
				lastname3       : '',
				firstname4      : '',
				lastname4       : '',
			}
		}
	}

	updateMakelistFields(field, event) {
		let fields = Object.assign({}, this.state.makelistNames);
		fields[field] = event.target.value;
		this.setState({
			makelistNames: fields
		})
    }
    
    onNext(event) {
		console.log(this.state.makelistNames)
	}

	render() {

		return (
			<div className='btw-identity btw-makelist'>

				<div className="intro">
					<p className="intro-title">
                        Generate Lorem Ipsum placeholder text
					</p>

					<p className="intro-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<form>
					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname1">First Name</label>
							<input type="text" className="input-field" id="firstname1" ref="firstname1"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname1')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname1">Last Name</label>
							<input type="text" className="input-field" id="lastname1" ref="lastname1"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname1')}></input>
						</div>
					</div>


					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname2">First Name</label>
							<input type="text" className="input-field" id="firstname2" ref="firstname2"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname2')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname2">Last Name</label>
							<input type="text" className="input-field" id="lastname2" ref="lastname2"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname2')}></input>
						</div>
					</div>


					<div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname3">First Name</label>
							<input type="text" className="input-field" id="firstname3" ref="firstname3"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname3')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname3">Last Name</label>
							<input type="text" className="input-field" id="lastname3" ref="lastname3"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname3')}></input>
						</div>
					</div>

                    <div className="row">
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname4">First Name</label>
							<input type="text" className="input-field" id="firstname4" ref="firstname4"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'firstname4')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname4">Last Name</label>
							<input type="text" className="input-field" id="lastname4" ref="lastname4"
								required="" aria-required="true"
								onChange={this.updateMakelistFields.bind(this, 'lastname4')}></input>
						</div>
					</div>

				</form>
				<div id="btn_next">
					<button className="btn btn-primary" onClick={this.onNext.bind(this, 'btwSignOn')}>Next</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
}


const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Makelist);