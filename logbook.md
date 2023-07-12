# Logbook

## 2023-06-28

### Planned goals
- Run first live coding broadcast
- Use GVim for roadmapping
- Show previously implemented versions of the game
- Assess usage of Node, Deno and terminal graphics libraries on Windows
- Determine whether ChatGPT works well as a development-aiding tool

### Findings
- Broadcast quality was great
- https://awvalenti.github.io/fugaescorregadia/ is not working on Firefox
- blessed and terminal-kit libs apparently work well on CMD, WT/GitBash and PowerShell
- Need to know how to increase font size for GVim to be more useful
- ChatGPT rarely produces actually useful output
- <Leader><Leader>+ increases font size in GVim

### Results
- Broadcast run successfully
- Node, Deno and libs still need analysis
- ChatGPT should be used only when other attempts don't work well
- Demo game using terminal-kit generated successfully by ChatGPT
- Project was uploaded to GitHub

## 2023-06-29

### Planned goals
- Use GVim for roadmapping
- Show previously implemented versions of the game
- Decide on Node or Deno based on distribution of app package
- Decide on which terminal graphics library based on Windows usage

### Findings
- Deno doesn't have a working terminal graphics library. So, Node for the win!
- Both terminal-kit and blessed work well and have sample games
- terminal-kit:
  - Actively developed
  - Simpler API
  - More docs
- blessed:
  - Examples here: https://github.com/chjj/blessed/tree/master/example
  - apparently not maintained anymore
  - More complex API
  - Fully working sample games:
    - Pong: https://github.com/chjj/blessed/blob/master/example/ping
    - Snake: https://github.com/taniarascia/snek

### Achieved goals
- Roadmapping
- Showed CoffeeScript version
- Decided to use Node

## 2023-07-04

### Planned goals
- Show QBasic version
- Test blessed and terminal-kit on Linux
- Write sample games using terminal-kit and blessed
- Decide for one of them

### Findings
- On Windows, terminal-kit works fine on all terminals: WT, PowerShell and CMD
- Both terminal-kit and blessed libs ran slowly on Linux, due to CPU usage during broadcast

### Achieved goals
- QBasic version shown
- Ran working demo using terminal-kit
- Decided to adopt terminal-kit

## 2023-07-05

### Planned goals
- Have a playable version of the game with one level and the following elements:
  - Player
  - Goal
  - Obstacle
  - Walls

### Achieved goals
- Playable game, containing: Player|Goal|Obstacle|Walls, colors and level finishing
- Bug: player removes obstacles sometimes, especially moving down, but also up
- Semi-bug: player can change direction during move

## 2023-07-06

### Planned goals
- Fix bugs from yesterday:
  - DONE Removing obstacle during move
  - DONE Player can change direction during move
  - DONE Player flickering while still
- DONE Make spacing better

## 2023-07-11

### Planned goals
- Write compatibility table of operating systems and terminal emulators
- Choose graphics characters (at least a preliminary version)
- Output animated text

### Findings
- Unicode has double-width or fullwidth characters, which appear in the terminal using two slots
- We can use single-width characters printed twice to simulate double-width characters

### Achieved goals
- Initial compatibility table made
- Preliminary graphical characters chosen
- Board borders made

## 2023-07-12

### Planned goals
- Quickly replace double-width characters with single-width characters
- Output animated text

### Achieved goals
- Characters replaced
- Basic text animation done

