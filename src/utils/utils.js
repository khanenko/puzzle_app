export const compareRandom = () => {
    return Math.random() - 0.5;
};

const generateUniqueId = () =>
    Math.random().toString().substr(2, 16);

export const createBoard = size => {
    let board = new Array(size * size);
    for (let i = 0; i < size * size;) {
        board[i] = {
            value: ++i,
            id: generateUniqueId()
        };
    }
    board[size * size - 1] = {value: 0, id: generateUniqueId()};

    return board;
};

export const maybeYouWin = board => {
    return board.every((item, index, board) => {
        if (item.value == 0 && index == board.length - 1) {
            return true;
        }

        return item.value == index + 1;
    });
};

export const congratulate = (winElement, greetings) => {
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