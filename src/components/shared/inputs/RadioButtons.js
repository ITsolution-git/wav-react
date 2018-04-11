import React from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel, FormLabel } from 'material-ui/Form';

import InputBase from './InputBase';

export default class RadioButtons extends InputBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        }
    }

    render() {
        const { values = [], title = '' } = this.props;
        return (
            <div>
                <FormLabel>{ title }</FormLabel>
                <RadioGroup value={this.state.value} onChange={this.handleChange}>
                    { values.map((radio, index) => {
                        return  <FormControlLabel
                            key={index}
                            value={radio.value}
                            control={<Radio color="primary" />}
                            label={radio.label} />
                    })}
                </RadioGroup>
            </div>
        );
    }
}