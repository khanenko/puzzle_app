import React from 'react';

import {
    ROW_SIZE,
    KEY_DIRECTION,
    GREETINGS_TEXT
} from '../constants/constants';
import {moveItem} from '../utils/navigationUtils';
import {createBoard, compareRandom, maybeYouWin, congratulate} from '../utils/utils';
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
        const winElement = this._winElement;
        if(winElement) {
            congratulate(winElement, GREETINGS_TEXT);
        }
    }

    shuffle = board => {
        board.sort(compareRandom);
        this.setState({board: board, isFinished: false, isStarted: true});
    };

    handleKeyDown = event => {
        const {isFinished, isStarted} = this.state;
        if(isFinished) return;
        const direction = KEY_DIRECTION[event.keyCode];
        if(!direction) return;

        const {board, rowSize} = this.state;
        const zeroIndex = board.indexOf(board.find(item => item.value == 0));
        moveItem(board, direction, zeroIndex, rowSize);
        if(isStarted && maybeYouWin(board)) {
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
            <div className='puzzle'>
                <Board board={board} rowSize={rowSize}/>
                {isFinished ? <div className="win"><p className="win_inner" ref={(node) => { this._winElement = node; }}/></div> : null}
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