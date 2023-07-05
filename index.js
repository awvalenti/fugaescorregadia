var term = require( 'terminal-kit' ).terminal ;

term.clear();

term.hideCursor();

const board = [
  ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
  ['-', '-', '-', '-', '-', '-', 'o', '-'],
  ['-', 'o', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', 'o', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', 's', '-', '-', 'o', 'g', '-', '-'],
]

const minX = 0, minY = 0,
  maxX = board[0].length - 1,
  maxY = board.length - 1

const
  terminalMaxX = process.stdout.columns - 1,
  terminalMaxY = process.stdout.rows - 1

if (terminalMaxX < maxX || terminalMaxY < maxY) {
  throw 'Insufficient terminal space for board'
}

const findStartingPoint = (board) => {
  for (let rowIndex in board) {
    for (let colIndex in board[rowIndex]) {
      if (board[rowIndex][colIndex] === 's') {
        return [+colIndex, +rowIndex]
      }
    }
  }
  throw 'Starting point not found'
}

let [posX, posY] = findStartingPoint(board)

let deltaX = 0, deltaY = 0, oldPosX = 0, oldPosY = 0

for (let rowI = 0; rowI < board.length; ++rowI) {
  for (let colI = 0; colI < board[rowI].length; ++colI) {
    const tile = board[rowI][colI];
    switch (tile) {
      case '-':
        term.moveTo.gray(colI, rowI, tile) ;
        break;
      case 's':
        term.moveTo.red(colI, rowI, tile) ;
        break;
      case 'g':
        term.moveTo.yellow(colI, rowI, tile) ;
        break;
      case 'o':
        term.moveTo.cyan(colI, rowI, tile) ;
        break;

    }
  }
}

const gameLoop = () => {
  // erase old pos
  term.moveTo.gray(oldPosX, oldPosY, '-') ;

  // set new and old pos
  const newPosX = posX + deltaX, newPosY = posY + deltaY;

  // check if should update player pos
  if (true
    && newPosX >= minX
    && newPosX <= maxX
    && newPosY >= minY
    && newPosY <= maxY
    && board[newPosY][newPosX] !== 'o'
    ) {
    [posX, posY] = [newPosX, newPosY];
    oldPosX = posX
    oldPosY = posY
  }

  // update new pos
  term.moveTo.red(posX, posY, 's') ;

  if (board[posY][posX] === 'g') {
    console.log('FINISH!');
    term.processExit(0);
  }
  setTimeout(gameLoop, 30);
}

gameLoop()


term.grabInput();

term.on('key', function(name, matches, data) {
  switch (name) {
    case  'ESCAPE':
      term.clear(); // doesn't work?
      term.hideCursor();
      term.processExit(0);
      break;
    case 'LEFT':
      deltaX = -1;
      deltaY = 0
      break;
    case 'RIGHT':
      deltaX = +1;
      deltaY = 0
      break;
    case 'DOWN':
      deltaY = +1;
      deltaX = 0
      break;
    case 'UP':
      deltaY = -1;
      deltaX = 0
      break;
  }
});
