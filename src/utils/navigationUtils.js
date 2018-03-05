import {
    UP_DIRECTION,
    DOWN_DIRECTION,
    RIGHT_DIRECTION,
    LEFT_DIRECTION
} from '../constants/constants';

const canMoveLeft = (zeroIndex, rowSize) => (zeroIndex % rowSize) != (rowSize - 1);

const canMoveRight = (zeroIndex, rowSize) => (zeroIndex % rowSize) != 0;

const canMoveUp = (zeroIndex, rowSize) => zeroIndex < (rowSize * (rowSize - 1));

const canMoveDown = (zeroIndex, rowSize) => zeroIndex > (rowSize - 1);

const moveLeft = (board, zeroIndex, rowSize) => {
    if (!canMoveLeft(zeroIndex, rowSize)) return;
    const rightNeighbor = zeroIndex + 1;
    [board[zeroIndex], board[rightNeighbor]] = [board[rightNeighbor], board[zeroIndex]];
};

const moveRight = (board, zeroIndex, rowSize) => {
    if (!canMoveRight(zeroIndex, rowSize)) return;
    const leftNeighbor = zeroIndex - 1;
    [board[zeroIndex], board[leftNeighbor]] = [board[leftNeighbor], board[zeroIndex]];
};
const moveUp = (board, zeroIndex, rowSize) => {
    if (!canMoveUp(zeroIndex, rowSize)) return;
    const bottomNeighbor = zeroIndex + rowSize;
    [board[zeroIndex], board[bottomNeighbor]] = [board[bottomNeighbor], board[zeroIndex]];
};
const moveDown = (board, zeroIndex, rowSize) => {
    if (!canMoveDown(zeroIndex, rowSize)) return;
    const upperNeighbor = zeroIndex - rowSize;
    [board[zeroIndex], board[upperNeighbor]] = [board[upperNeighbor], board[zeroIndex]];
};
export const moveItem = (board, direction, zeroIndex, rowSize) => {
    if (direction == LEFT_DIRECTION) {
        moveLeft(board, zeroIndex, rowSize);
    }
    if (direction == RIGHT_DIRECTION) {
        moveRight(board, zeroIndex, rowSize);
    }
    if (direction == DOWN_DIRECTION) {
        moveDown(board, zeroIndex, rowSize);
    }
    if (direction == UP_DIRECTION) {
        moveUp(board, zeroIndex, rowSize);
    }
};
