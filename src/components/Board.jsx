import React from 'react';

import Cell from './Cell.jsx';

export default class Board extends React.Component {

    render() {
        const {board, rowSize} = this.props;
        return (
        <div className="board">
            {
                board.map((cell, index) =>
                    <Cell value={cell.value} cellWidth={100/rowSize} key={cell.id}/>
                )
            }
        </div>
        );
    }
}