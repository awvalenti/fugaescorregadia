var term = require( 'terminal-kit' ).terminal ;

term.clear();

term.hideCursor();

function printChar(color, row, col, char) {
  term.color(color).moveTo(2 * (col + 1), row + 1, char) ;
}

const board = [
  ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
  [' ', ' ', ' ', ' ', ' ', ' ', 'o', ' '],
  [' ', 'o', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'o', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', 'p', ' ', ' ', 'o', 'g', ' ', ' '],
]

const minCol = 0, minRow = 0,
  maxCol = board[0].length - 1,
  maxRow = board.length - 1

const
  terminalMaxCol = process.stdout.columns - 1,
  terminalMaxRow = process.stdout.rows - 1

if (terminalMaxCol < maxCol || terminalMaxRow < maxRow) {
  throw 'Insufficient terminal space for board'
}

const findStartingPoint = (board) => {
  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board[row].length; ++col) {
      if (board[row][col] === 'p') {
        return [row, col]
      }
    }
  }
  throw 'Starting point not found'
}

let [playerRow, playerCol] = findStartingPoint(board)
// console.log('starting point', playerRow, playerCol);

let deltaCol = 0, deltaRow = 0, oldPlayerCol = playerCol, oldPlayerRow = playerRow

for (let row = 0; row < board.length; ++row) {
  for (let col = 0; col < board[row].length; ++col) {
    const tile = board[row][col];
    // console.log({ row, col, tile });
    switch (tile) {
      case ' ':
        printChar('gray', row, col, tile)
        break;
      case 'p':
        printChar('red', row, col, tile)
        break;
      case 'g':
        printChar('yellow', row, col, tile)
        break;
      case 'o':
        printChar('cyan', row, col, tile)
        break;

    }
  }
}

// process.exit()

let olderPlayerRow, olderPlayerCol
const gameLoop = () => {
  olderPlayerRow = oldPlayerRow
  olderPlayerCol = oldPlayerCol

  // set new and old pos
  const
    newPlayerCol = playerCol + deltaCol,
    newPosRow = playerRow + deltaRow;

  // check if should update player pos
  if (true
    && newPlayerCol >= minCol
    && newPlayerCol <= maxCol
    && newPosRow >= minRow
    && newPosRow <= maxRow
    && board[newPosRow][newPlayerCol] !== 'o'
    ) {
    [playerCol, playerRow] = [newPlayerCol, newPosRow];
    [oldPlayerCol, oldPlayerRow] = [playerCol, playerRow]
  } else {
    deltaRow = deltaCol = 0
  }

  // debug
  // term.moveTo.blue(0, 10, JSON.stringify({ playerCol, playerRow }));
  if (playerRow !== olderPlayerRow || playerCol !== olderPlayerCol) {
    // erase old pos
    printChar('gray', olderPlayerRow, olderPlayerCol, ' ')

    // update new pos
    printChar('red', playerRow, playerCol, 'p')
  }

  if (board[playerRow][playerCol] === 'g') {
    console.log('FINISH!');
    term.processExit(0);
  } else {
    setTimeout(gameLoop, 30);
  }
}

gameLoop()


term.grabInput();

term.on('key', function(name, matches, data) {
  switch (name) {
    case 'ESCAPE':
      term.clear(); // doesn't work?
      term.hideCursor();
      term.processExit(0);
      break;
    case 'LEFT':
    case 'RIGHT':
    case 'DOWN':
    case 'UP':
      if (deltaRow !== 0 || deltaCol !== 0) {
        return
      }
  }
  switch (name) {
    case 'LEFT':
      deltaCol = -1;
      deltaRow = 0
      break;
    case 'RIGHT':
      deltaCol = +1;
      deltaRow = 0
      break;
    case 'DOWN':
      deltaRow = +1;
      deltaCol = 0
      break;
    case 'UP':
      deltaRow = -1;
      deltaCol = 0
      break;
  }
});
