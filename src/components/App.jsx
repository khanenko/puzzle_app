import React from 'react';

import {
    ROW_SIZE,
    KEY_DIRECTION
} from '../constants/constants';
import {moveItem} from '../utils/navigationUtils';
import Board from './Board.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            rowSize: ROW_SIZE
        };
    }

    componentWillMount() {
        const board = createBoard(ROW_SIZE);
        this.setState({board: board});

        const body = document.querySelector('body');
        body.addEventListener('keydown', this.handleKeyDown);
    }

    shuffle = board => {
        board.sort(compareRandom);
        this.setState({board: board});
    };

    handleKeyDown = event => {
        const direction = KEY_DIRECTION[event.keyCode];
        if(!direction) return;

        const {board, rowSize} = this.state;
        const zeroIndex = board.indexOf(0);
        moveItem(board, direction, zeroIndex, rowSize);

        this.setState({board: board});
    };

    handleSizeChange = event => {
        const rowSize = +event.target.value;
        const board = createBoard(rowSize);

        this.setState({board: board, rowSize: rowSize});
    };

    render() {
        return (
            <div className='puzzle'>
                <h1>React puzzle game</h1>
                <Board board={this.state.board}/>
                <button onClick={() => this.shuffle(this.state.board)}>Shuffle</button>
                <br/>
                <input type="range"
                       id="board_size"
                       min={3}
                       max={6}
                       value={this.state.rowSize}
                       onChange={this.handleSizeChange}
                       onKeyDown={(event) => {event.preventDefault()}}
                />
            </div>
        );
    }
}

const compareRandom = (a, b) => {
    return Math.random() - 0.5;
};

const createBoard = size => {
    let board = new Array(size * size);
    for (let i = 0; i < size * size;) board[i] = ++i;
    board[size * size - 1] = 0;

    return board;
};