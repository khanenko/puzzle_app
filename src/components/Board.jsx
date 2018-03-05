import React from 'react';

import Cell from './Cell.jsx';

export default class Board extends React.Component {

    render() {
        return (
        <div id="board">
            {
                this.props.board.map((cell, index) =>
                    <Cell value={cell} key={index}/>
                )
            }
        </div>
        );
    }
}