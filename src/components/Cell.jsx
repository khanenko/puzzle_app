import React from 'react';

export default class Cell extends React.Component {
    render() {
        const {value} = this.props;
        const cls = value == 0 ? 'empty cell' : 'cell';
        const number = value == 0 ? '' : value;
        return (
            <div className={cls}><div className="inner">{number}</div></div>
        );
    }
}