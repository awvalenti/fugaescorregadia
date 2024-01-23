import terminalKit from 'terminal-kit';
import { SoundPlayer } from './sound-player/SoundPlayer.js';

const levels = [
  [
    ['█', '█', '█', '█', '█', '█', '█', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$'],
    [' ', ' ', ' ', ' ', ' ', '█', '█', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', '█', ' ', ' ', ' ', ' ', ' ', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', ' ', ' ', '█', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    ['█', ' ', ' ', ' ', '█', ' ', ' ', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', '¤', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    ['@', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$'],
  ],
  [
    ['█', '█', '█', '█', '█', '█', '█', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$'],
    [' ', ' ', ' ', ' ', ' ', '█', '█', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    ['@', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$'],
    [' ', '█', ' ', ' ', ' ', ' ', ' ', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', ' ', ' ', '█', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', '█', ' ', ' ', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', '¤', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
  ],
  [
    [' ', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$'],
    ['@', '█', '█', '█', '█', '█', '█', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$', '$'],
    [' ', ' ', ' ', ' ', ' ', '█', '█', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', '█', ' ', ' ', ' ', ' ', ' ', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', ' ', ' ', '█', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', '█', ' ', ' ', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', '¤', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$'],
  ],
]
let
  gameLooping = true,
  soundPlayer, term,
  bgm, levelClear, itemFx,
  playerRow, playerCol,
  deltaCol = 0, deltaRow = 0,
  oldPlayerCol = playerCol,
  oldPlayerRow = playerRow,
  olderPlayerRow, olderPlayerCol,
  points = 0,
  levelIndex = 0,
  board = levels[levelIndex]

const
  minCol = 0, minRow = 0,
  maxCol = board[0].length - 1, maxRow = board.length - 1,
  pointsLine = maxRow + 4,
  statusLine = maxRow + 3

function initLevel() {
  board = levels[levelIndex];

  [deltaRow, deltaCol] = [0, 0];

  [olderPlayerRow, olderPlayerCol] =
    [oldPlayerRow, oldPlayerCol] =
    [playerRow, playerCol] =
    findStartingPoint(board);
}

async function initVars() {
  term = terminalKit.terminal;

  soundPlayer = await SoundPlayer.create();

  initLevel();
}

function setupTerminal() {
  const
    terminalMaxCol = process.stdout.columns - 1,
    terminalMaxRow = process.stdout.rows - 1

  if (terminalMaxCol < maxCol || terminalMaxRow < maxRow) {
    throw 'Insufficient terminal space for board'
  }

  term.hideCursor();
  term.bgColor('black');
  term.clear();
  term.grabInput();
  term.on('key', function (name) {
    switch (name) {
      case ' ':
        bgm.pause();
        setTimeout(() => {
          bgm.resume();
        }, 1000);
        break;
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
          return;
        }
    }
    switch (name) {
      case 'LEFT':
        deltaCol = -1;
        deltaRow = 0;
        break;
      case 'RIGHT':
        deltaCol = +1;
        deltaRow = 0;
        break;
      case 'DOWN':
        deltaRow = +1;
        deltaCol = 0;
        break;
      case 'UP':
        deltaRow = -1;
        deltaCol = 0;
        break;
    }
  });
}

function printBorders() {
  let upperOrLowerRow = ''
  for (let i = 0; i <= maxCol + 2; ++i) {
    upperOrLowerRow += '║║'
  }

  let innerRow = '║║'
  for (let i = 0; i <= maxCol; ++i) {
    innerRow += '  '
  }
  innerRow += '║║'

  term.color('gray', upperOrLowerRow);
  for (let i = 0; i <= board.length; ++i) {
    term.color('gray').moveTo(1, i + 2, innerRow);
  }
  term.color('gray').moveTo(1, board.length + 2, upperOrLowerRow);
}

function printPointsLine() {
  term.color('blue').moveTo(1, pointsLine, `Points: ${points}`);
}

function printStaticContent() {
  printBorders();
  printPointsLine();
}

function printSingleChar(color, col, i, row, phrase) {
  term.color(color).moveTo(2 * col + 1 + i, row + 2, phrase[i]);
}

function printDoubledChar(color, row, col, char) {
  term.color(color).moveTo(2 * col + 1 + 2, row + 1 + 1, char + char);
}

function animateText(color, row, col, phrase, onFinish) {
  function loop(i) {
    if (i < phrase.length) {
      printSingleChar(color, col, i, row, phrase);
      setTimeout(() => {
        loop(i + 1)
      }, 120);
    } else {
      onFinish()
    }
  }
  loop(0)
}

function findStartingPoint(board) {
  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board[row].length; ++col) {
      if (board[row][col] === '@') {
        return [row, col]
      }
    }
  }
  throw 'Starting point not found'
}

function printBoardContents() {
  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board[row].length; ++col) {
      const tile = board[row][col];
      switch (tile) {
        case ' ':
          printDoubledChar('black', row, col, tile)
          break
        case '@':
          printDoubledChar('brightGreen', row, col, tile)
          break
        case '¤':
          printDoubledChar('brightYellow', row, col, tile)
          break
        case '█':
          printDoubledChar('cyan', row, col, tile)
          break
        case '$':
          printDoubledChar('blue', row, col, tile)
          break
      }
    }
  }
}

function gameLoop() {
  olderPlayerRow = oldPlayerRow;
  olderPlayerCol = oldPlayerCol;

  const
    newPlayerCol = playerCol + deltaCol,
    newPosRow = playerRow + deltaRow;

  if (true
    && newPlayerCol >= minCol
    && newPlayerCol <= maxCol
    && newPosRow >= minRow
    && newPosRow <= maxRow
    && board[newPosRow][newPlayerCol] !== '█') {
    [playerCol, playerRow] = [newPlayerCol, newPosRow];
    [oldPlayerCol, oldPlayerRow] = [playerCol, playerRow];
  } else {
    deltaRow = deltaCol = 0;
  }

  if (playerRow !== olderPlayerRow || playerCol !== olderPlayerCol) {
    printDoubledChar('brightGreen', olderPlayerRow, olderPlayerCol, ' ');
    printDoubledChar('brightGreen', playerRow, playerCol, '@');
  }
  const currentElement = board[playerRow][playerCol]

  if (currentElement === '¤') {
    bgm.pause();
    // TODO
    // levelClear.pause();
    levelClear.start();
    if (++levelIndex < levels.length) {
      initLevel()
      printBoardContents()
      setTimeout(() => {
        bgm.resume();
      }, 3000);
    } else {
      gameLooping = false
      setTimeout(() => {
        animateText('white', statusLine, 0, 'FINISH!', () => {
          term.processExit(0);
        });
      }, 1500);
    }
  } else if (currentElement === '$') {
    itemFx.start()
    points += 100
    printPointsLine()
    board[playerRow][playerCol] = ' '
  }

  if (gameLooping) setTimeout(gameLoop, 50);
}

async function loadAudioFiles() {
  [bgm, levelClear, itemFx] = await Promise.all([
    soundPlayer.load('audio/adrift-bgm-cropped.mp3'),
    soundPlayer.load('audio/level-clear.mp3', { maxInstances: 2 }),
    soundPlayer.load('audio/item.mp3', { maxInstances: 15 }),
  ]);
}

await initVars()

console.log('loading audio files...');
await loadAudioFiles();

setupTerminal();
printStaticContent()
printBoardContents()

bgm.start()

gameLoop();
