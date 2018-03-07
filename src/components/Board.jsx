import React from 'react';

import Cell from './Cell.jsx';

export default class Board extends React.Component {

    render() {
        const {board, rowSize} = this.props;

        return (
        <div id="board">
            {
                board.map((cell, index) =>
                    (index % rowSize) || (index == 0)
                        ?
                        <Cell value={cell} key={index}/>
                        :
                        <React.Fragment key={index}>
                            <div className="separator"/>
                            <Cell value={cell}/>
                        </React.Fragment>

                )
            }
        </div>
        );
    }
}