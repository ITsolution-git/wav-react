import React from 'react'
import memorize from 'memoize-one';

import { BaseComponent } from '../index'

const RadioContext = React.createContext()

export class RadioGroup extends BaseComponent {

	state = {
		value: ''
	}

	handleChange = value => event => {
		this.setState({ value })
		// this.props.onChange(value)
	}

	createContextValue = memorize((value, name, onChange) => ({
		value, 
		name,
		onChange
	}))

	render() {
		return (
			<RadioContext.Provider
				value={this.createContextValue(
					this.state.value || this.props.value,
					this.props.name,
					this.handleChange
				)}
			>
				{this.props.children}
			</RadioContext.Provider>
		)
	}
}


export class RadioOption extends BaseComponent {
	render() {
		return (
			<RadioContext.Consumer>
				{radioGroup => (
					<div className='btw-radio-option'>
						<input
							id={this.props.value}
							type='radio'
							name={radioGroup.name}
							checked={radioGroup.value === this.props.value}
							onChange={radioGroup.onChange(this.props.value)}
						/>
						<label htmlFor={this.props.value}>{this.props.children}</label>
					</div>

				)}
			</RadioContext.Consumer>
		)
	}
}