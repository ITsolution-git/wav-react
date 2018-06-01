import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import InputBase from './InputBase';

export default class RadioButtons extends InputBase {

    render() {
        const { values = [], title = '', value = '' } = this.props;
        return (
            <div>
                <FormLabel>{ title }</FormLabel>
                <RadioGroup value={value} onChange={this.handleChange}>
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