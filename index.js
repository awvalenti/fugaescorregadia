import terminalKit from 'terminal-kit' ;
import { exec } from 'child_process';
import path from 'path';
import { readFileSync } from 'fs';

const term = terminalKit.terminal

import { FLACDecoder } from '@wasm-audio-decoders/flac';

const decoder = new FLACDecoder();

await decoder.ready;

function windowsPlaySound(file) {
  exec(`
    $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New();
    $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri('${path.resolve(file)}');
    $MediaPlayer.Play();
    Start-Sleep -s ($MediaPlayer.NaturalDuration.Seconds + 1)
    `, { shell: 'powershell' }
  )
}

const x = ArrayBuffer, y = Buffer, z = Float32Array

async function linuxPlaySound(file) {
  const flacBuffer = readFileSync(file)
  const decoded = await decoder.decode(flacBuffer, { outputFormat: 's16', numberOfChannels: 2, sampleRate: 44100 })
  // console.log();
  // console.log({decoded, channelData: decoded.channelData});
  const [left, right] = decoded.channelData
  // console.log(left.constructor.name)
  const childProcess = exec(`aplay -q -f float_be`)
  childProcess.stdin.write(left.toString())
  childProcess.stdin.end()
}

function playSound(file) {
  const isWin = process.platform === "win32";
  // TODO avoid code injection
  if (isWin) {
    windowsPlaySound(file)
  } else {
    linuxPlaySound(file)
  }
}

term.hideCursor();
term.bgColor('black');
term.clear();

const board = [
  ['█', '█', '█', '█', '█', '█', '█', '█'],
  [' ', ' ', ' ', ' ', ' ', '█', '█', '¤'],
  [' ', '█', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', '█', ' '],
  [' ', ' ', ' ', ' ', '█', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '@', ' ', ' ', '█', ' ', ' ', '█'],
];

term.color('gray','░░░░░░░░░░░░░░░░░░░░');
for (let i = 0; i <= board.length; ++i) {
  term.color('gray').moveTo(1, i + 2, '░░                ░░');
}
term.color('gray').moveTo(1, board.length + 2, '░░░░░░░░░░░░░░░░░░░░');

function printChar(color, row, col, char) {
  term.color(color).moveTo(2 * col + 1 + 2, row + 1 + 1, char);
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
        printChar('yellow', row, col, tile)
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
    playSound('finish.flac')
    animateText('white', maxRow + 2, 0, 'FINISH!', () => {
      term.processExit(0);
    });
  } else {
    setTimeout(gameLoop, 30);
  }
}

playSound('start.flac')

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
