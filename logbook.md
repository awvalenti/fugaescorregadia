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

## 2023-07-13

### Planned goals
- Find libraries to play sound
  - Make POC using library that plays WAV, MP3, OGG etc.
  - Make POC using library that generates sound using frequency

### Findings
- Hard (impossible?) not to depend on native libraries or programs
- alsa-source probably needed to install NodeJS lib speaker
- aplay command-line player is present on Linux by default, at least on Mint
- Easy to call command-line programs on NodeJS using child_process.exec
- On macOS, afplay seems to work
- On Windows, there are PowerShell (https://superuser.com/a/528541) and VLC

### Achieved goals
- POC using native Linux program that plays WAV

### Next steps
- Verify that macOS and Windows options really work fine
- On NodeJS program, convert Opus/Ogg/MP3 stream to WAV and output it to aplay

## 2023-07-18

### Planned goals
- Play a WAV sound using PowerShell on Windows
- Play this same sound using CMD and Git Bash on Windows Terminal
- Discover the most compatible sound formats for the web
- Try other sound formats on Windows

### Findings
- On PowerShell, there's a small delay to play the sound
- On other terminals, there's a medium delay to play the sound
- On Windows with GitBash, sound gets cut if app finishes
- MP3 is really the most compatible format (even more than WAV)
  - That seems to be only actually important for very old browsers
  - FLAC seems a possible option
  - Opus is a good open-source option
  - AAC in MP4/m4a seems to be the most cost-effective option
- Windows PowerShell SoundPlayer can play only WAV files
- play-sound worked marvelously on Windows:
  - Has less than 50KB
  - Plays WAV, MP3, M4A/AAC
  - However, it seems to take some seconds to warm up
- At least on Windows, terminal-kit is more than 8MB!
- At least on Windows, blessed is only 1.8MB!

### Achieved goals
- Play a WAV sound using PowerShell on Windows
- Play this same sound using CMD and Git Bash on Windows Terminal
- Discover the most compatible sound formats for the web
- Try other sound formats on Windows

### Next goals
- Read play-sound source code to understand how it uses PowerShell
- Reconsider play-sound on Linux
- Reconsider blessed, assessing its size on Linux and macOS

## 2023-07-19

### Planned goals
- Read play-sound source code to understand how it uses PowerShell
- Check again play-sound on Linux
  - Size
  - Dependency on native libraries
- Check blessed size on Linux

### Findings
- play-sound simply relies on an installed sound player
- It's possible to play AAC on Windows via PowerShell!

### Achieved goals
- play-sound source code read and understood
- Found a way to play AAC or FLAC on Windows:
  ```powershell
  $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
  $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri("C:\Users\andre\p\fugaescorregadia\start.aac")
  $MediaPlayer.Play()
  ```

## 2023-07-20

### Planned goals
- Make it simple to play compressed sound on Windows
- Check again play-sound on Linux
  - Size
  - Dependency on native libraries
- Check blessed size on Linux

### Findings
- powershell -c (New-Object Media.SoundPlayer "${file}").PlaySync();
  is the old way, plays only WAV
- On Linux:
  - aplay can read from stdin, just run "aplay -q" and send data to stdin
  - blessed occupies 2.1MB and terminal-kit, 9.1MB
  - node-aac depends on native library
  - audio-decode has 9MB

### Achieved goals
- Make it simple to play compressed sound on Windows
- Check again play-sound on Linux
- Check blessed size on Linux
- Verified aplay feature of reading from stdin

### Next steps
- Decode compressed audio on Linux

