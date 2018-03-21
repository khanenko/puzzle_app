import React from 'react';

export default class Cell extends React.Component {
    render() {
        const {value, cellWidth} = this.props;
        const cls = value == 0 ? 'empty cell' : 'cell';
        const number = value == 0 ? '' : value;

        return (
            <div className={cls} style={styles.cell(cellWidth)}><p className="inner">{number}</p></div>
        );
    }
}

const styles = {
    cell: (cellWidth) => {
        return {
            flex: `1 0 ${cellWidth}%`
        }
    }
};