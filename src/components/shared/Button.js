import React from 'react';

export default class Button extends React.Component {

    render() {
        const {
            children,
            size='large',
            style = {},
            disabled,
            onClick = () => {}
        } = this.props;

        return (
            <button className={`btw-button button-${size}`}
                    style={style}
                    disabled={disabled}
                    onClick={onClick}>
                { children }
            </button>
        )
    }
}