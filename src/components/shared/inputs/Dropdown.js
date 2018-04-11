import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import InputBase from '../BaseComponent';

export default class Dropdown extends InputBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        }
    }

    render() {
        const { values = [], label = '' } = this.props;
        return (
            <div>
                <FormControl>
                    <InputLabel>{ label }</InputLabel>
                    <Select
                        native
                        value={this.state.value}
                        onChange={this.handleChange}
                        { values.map(this.mapItem).map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{ item.label}</option>
                            )
                        })} >
                    </Select>
                </FormControl>
            </div>
        );
    }
}