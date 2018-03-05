import React from 'react';

export default class Cell extends React.Component {
    render() {
        const cls = this.props.value === 0 ? 'square zero' : 'square';
        return (
            <span className={cls}>{this.props.value + '*'}</span>
        );
    }
}