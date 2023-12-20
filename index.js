import terminalKit from 'terminal-kit';
import { SoundPlayer } from './sound-player/SoundPlayer.js';

const soundPlayer = await SoundPlayer.create()

const term = terminalKit.terminal

// term.hideCursor();
// term.bgColor('black');
// term.clear();

let bgm

const board = [
  ['█', '█', '█', '█', '█', '█', '█', '█'],
  [' ', ' ', ' ', ' ', ' ', '█', '█', '¤'],
  [' ', '█', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', '█', ' '],
  [' ', ' ', ' ', ' ', '█', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', '@'],
  [' ', ' ', ' ', ' ', '█', ' ', ' ', '█'],
];

term.color('gray', '║║║║║║║║║║║║║║║║║║║║');
for (let i = 0; i <= board.length; ++i) {
  term.color('gray').moveTo(1, i + 2, '║║                ║║');
}
term.color('gray').moveTo(1, board.length + 2, '║║║║║║║║║║║║║║║║║║║║');

function printChar(color, row, col, char) {
  term.color(color).moveTo(2 * col + 1 + 2, row + 1 + 1, char + char);
}

function animateText(color, row, col, phrase, onFinish) {
  function loop(i) {
    if (i < phrase.length) {
      term.color(color).moveTo(2 * col + 1 + i, row + 1 + 1, phrase[i]);
      // printChar(color, row, col + i, phrase[i])
      setTimeout(() => {
        loop(i + 1)
      }, 120);
    } else {
      onFinish()
    }
  }
  loop(0)
}

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
      if (board[row][col] === '@') {
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
        printChar('black', row, col, tile)
        break;
      case '@':
        printChar('brightGreen', row, col, tile)
        break;
      case '¤':
        printChar('brightYellow', row, col, tile)
        break;
      case '█':
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
    && board[newPosRow][newPlayerCol] !== '█'
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
    printChar('brightGreen', olderPlayerRow, olderPlayerCol, ' ')

    // update new pos
    printChar('brightGreen', playerRow, playerCol, '@')
  }

  if (board[playerRow][playerCol] === '¤') {
    bgm.stop()
    // soundPlayer.play('audio/sunflower-street-drumloop-85bpm-163900.mp3')
    setTimeout(() => {
      // console.log('foooooooooooooooooi')
      // animateText('white', maxRow + 2, 0, 'FINISH!', () => {
        term.processExit(0);
      // });
    }, 200);
  } else {
    setTimeout(gameLoop, 50);
  }
}

// term.grabInput();

gameLoop()

// bgm = await soundPlayer.play('audio/adrift-bgm-cropped.mp3')
bgm = await soundPlayer.play('audio/sunflower-street-drumloop-85bpm-163900.mp3')
// bgm = await soundPlayer.play('/tmp/bgm.wav')
// bgm = await soundPlayer.play('audio/test.wav')

// setTimeout(() => {
//   soundPlayer.free()
// }, 15000);

// term.on('key', function (name, matches, data) {
//   switch (name) {
//     case 'ESCAPE':
//       term.clear(); // doesn't work?
//       term.hideCursor();
//       term.processExit(0);
//       // process.exit(0)
//       break;
//     case 'LEFT':
//     case 'RIGHT':
//     case 'DOWN':
//     case 'UP':
//       if (deltaRow !== 0 || deltaCol !== 0) {
//         return
//       }
//   }
//   switch (name) {
//     case 'LEFT':
//       deltaCol = -1;
//       deltaRow = 0
//       break;
//     case 'RIGHT':
//       deltaCol = +1;
//       deltaRow = 0
//       break;
//     case 'DOWN':
//       deltaRow = +1;
//       deltaCol = 0
//       break;
//     case 'UP':
//       deltaRow = -1;
//       deltaCol = 0
//       break;
//   }
// });

// process.on('SIGINT', () => {
//   console.log('ctrl-c');
//   // process.exit(0)
// })

process.on('exit', () => {
  console.log('exit');
  // process.exit(0)
})
