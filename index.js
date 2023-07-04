var term = require( 'terminal-kit' ).terminal ;

term.hideCursor();

let deltaX = 0, deltaY = 0, posX = 0, posY = 0, oldPosX = 0, oldPosY = 0

setInterval(() => {
  term.moveTo(oldPosX, oldPosY, ' ') ;
  posX += deltaX
  posY += deltaY
  term.moveTo.cyan(posX, posY, 'o') ;
  oldPosX = posX
  oldPosY = posY
}, 16);


term.grabInput();

term.on('key', function(name, matches, data) {
  switch (name) {
    case  'ESCAPE':
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
