import terminalKit from 'terminal-kit';
import { SoundPlayer } from './sound-player/SoundPlayer.js';

let
  soundPlayer, term,
  bgm, levelClear, itemFx,
  playerRow, playerCol,
  deltaCol = 0, deltaRow = 0,
  oldPlayerCol = playerCol,
  oldPlayerRow = playerRow,
  olderPlayerRow, olderPlayerCol,
  points = 0

const
  board = [
    ['█', '█', '█', '█', '█', '█', '█', '█'],
    [' ', ' ', ' ', ' ', ' ', '█', '█', '¤'],
    ['$', '█', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', '█', ' '],
    [' ', ' ', ' ', ' ', '█', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['@', ' ', '$', ' ', ' ', ' ', '$', '█'],
  ],
  minCol = 0, minRow = 0,
  maxCol = board[0].length - 1,
  maxRow = board.length - 1,
  pointsLine = maxRow + 4,
  statusLine = maxRow + 3

async function initVars() {
  term = terminalKit.terminal;

  [deltaRow, deltaCol] = [0, 0];

  [olderPlayerRow, olderPlayerCol] =
    [oldPlayerRow, oldPlayerCol] =
    [playerRow, playerCol] =
    findStartingPoint(board)

  soundPlayer = await SoundPlayer.create()
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
  term.color('gray', '║║║║║║║║║║║║║║║║║║║║');
  for (let i = 0; i <= board.length; ++i) {
    term.color('gray').moveTo(1, i + 2, '║║                ║║');
  }
  term.color('gray').moveTo(1, board.length + 2, '║║║║║║║║║║║║║║║║║║║║');
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
    bgm.stop();
    levelClear.start();
    setTimeout(() => {
      animateText('white', statusLine, 0, 'FINISH!', () => {
        term.processExit(0);
      });
    }, 2000);
  } else {
    if (currentElement === '$') {
      itemFx.start()
      points += 100
      printPointsLine()
      board[playerRow][playerCol] = ' '
    }
    setTimeout(gameLoop, 50);
  }
}

async function prefetchAudioFiles() {
  [bgm, levelClear, itemFx] = await Promise.all([
    soundPlayer.prefetch('audio/adrift-bgm-cropped.mp3'),
    soundPlayer.prefetch('audio/level-clear.mp3'),
    soundPlayer.prefetch('audio/item.mp3'),
  ]);
}

await initVars()

console.log('prefetching audio files...');
await prefetchAudioFiles();

setupTerminal();
printStaticContent()
printBoardContents()

bgm.start()

gameLoop();
