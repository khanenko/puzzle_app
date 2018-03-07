import React from 'react';

import {
    ROW_SIZE,
    KEY_DIRECTION,
    GREETINGS_TEXT
} from '../constants/constants';
import {moveItem} from '../utils/navigationUtils';
import Board from './Board.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            rowSize: ROW_SIZE,
            isFinished: false,
            isStarted: false
        };
    }

    componentWillMount() {
        const board = createBoard(ROW_SIZE);
        this.setState({board: board});

        const body = document.querySelector('body');
        body.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUpdate() {
        const winElement = document.getElementById("win_inner");
        if(winElement) {
            congratulate(winElement, GREETINGS_TEXT);
        }
    }

    shuffle = board => {
        board.sort(compareRandom);
        this.setState({board: board, isFinished: false, isStarted: true});
    };

    handleKeyDown = event => {
        const {isStarted, isFinished} = this.state;
        if(!isStarted || isFinished) return;
        const direction = KEY_DIRECTION[event.keyCode];
        if(!direction) return;

        const {board, rowSize} = this.state;
        const zeroIndex = board.indexOf(0);
        moveItem(board, direction, zeroIndex, rowSize);
        if(maybeYouWin(board)) {
            this.setState({isFinished: true});
        }
        this.setState({board: board});
    };

    handleSizeChange = event => {
        const rowSize = +event.target.value;
        const board = createBoard(rowSize);

        this.setState({board: board, rowSize: rowSize, isFinished: false, isStarted: false});
    };

    render() {
        const {board, rowSize, isFinished} = this.state;
        
        return (
            <div id='puzzle'>
                <Board board={board} rowSize={rowSize}/>
                {isFinished ? <div id="win"><p id="win_inner"/></div> : null}
                <input type="range"
                       className="board-size"
                       min={3}
                       max={6}
                       value={rowSize}
                       onChange={this.handleSizeChange}
                       onKeyDown={(event) => {event.preventDefault()}}
                />
                <button className="shuffle" onClick={() => this.shuffle(board)}>Shuffle</button>
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

const maybeYouWin = board => {
    return board.every((item, index, board) => {
        if (index == board.length - 1) {
            return true;
        }

        return item == index + 1;
    });
};

const congratulate = (winElement, greetings) => {
    let i = 0;
    let id = setInterval(frame, 50);

    function frame() {
        if (i > greetings.length - 1) {
            clearInterval(id);
        } else {
            winElement.innerHTML += greetings[i];
            i++;
        }
    }
};