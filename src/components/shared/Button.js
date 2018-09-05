import React from 'react';
import classNames from 'classnames';

export default class Button extends React.Component {

    render() {
        const {
            children,
            size='large',
            style = {},
            disabled,
            id,
            color = 'blue',
            borderEnabled = false,
            onClick = () => {}
        } = this.props;

        return (
            <button className={classNames(`btw-button button-${size} button-${color}`, { border: borderEnabled })}
                    id={id}
                    style={style}
                    disabled={disabled}
                    onClick={onClick}>
                { children }
            </button>
        )
    }
}