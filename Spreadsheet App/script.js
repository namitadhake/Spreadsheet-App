let cells = Array(1000).fill("");
let undoStack = [];
let redoStack = [];

function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        const input = document.createElement('input');
        input.type = 'text';
        input.value = cell;
        input.addEventListener('input', () => handleInput(index, input.value));
        cellDiv.appendChild(input);
        grid.appendChild(cellDiv);
    });
}

function handleInput(index, value) {
    saveToUndoStack([...cells]);
    if (validateData(value)) {
        cells[index] = value;
    }
}

function validateData(value) {
    return value.trim() !== '';
}

function saveToUndoStack(data) {
    undoStack.push(data);
    redoStack = []; 
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push([...cells]);
        cells = undoStack.pop();
        renderGrid();
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push([...cells]);
        cells = redoStack.pop();
        renderGrid();
    }
}

function search() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const cells = document.querySelectorAll('.cell input');
    cells.forEach((input) => {
        const cell = input.parentElement;
        if (input.value.toLowerCase().includes(searchTerm) && searchTerm !== '') {
            cell.style.backgroundColor = '#ffeb3b';
        } else {
            cell.style.backgroundColor = ''; 
        }
    });
}

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);
document.getElementById('search-btn').addEventListener('click', search);

renderGrid();
