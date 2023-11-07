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

## 2023-07-25

### Planned goals
- Write compatibility info
- Decode compressed audio on Linux and play it using shell command aplay

### Findings
- AAC may be a good choice combining efficiency and compatibility
- MP3 is indeed the most compatible one
- @wasm-audio-decoders produces Float32Array. We need Buffer or Uint8Array.

### Achieved goals
- Wrote compatibility info

## 2023-07-26

### Planned goals
- Decode compressed audio on Linux and play it using shell command aplay
  - ffmpeg.js
  - Convert Float32Array into Buffer

### Findings
- ffmpeg.js has a bug and can't be imported for now
- aplay is able to play different formats, including float. But it didn't work.
- package wav does not depend on optional native libraries
- package speaker may be able to replace aplay command
- Buffer.from(right.buffer) partially works when combined with package wav
  (produces distorted output)

## 2023-07-27

### Planned goals
- Try ffmpeg.js v0.11.6
- Try learning how to work with aplay

### Findings
- ffmpeg.js is very big (60+MB) and is still not working
- Finally, we were able to play the decoded sound using aplay!!
  - It only lacked passing sampling rate to aplay
- FLAC and MP3 worked; AAC, OGG and Opus didn't.

### Next steps
- Find more info about MP3 licensing
- Verify latency of MP3, WAV and FLAC playback on Windows

## 2023-08-19

### Planned goals
- Learn how to publish a package to NPM
- Sketch a first version of the library which is able to play WAV sound on NodeJS
- If possible, allow playing FLAC sounds as well, even if only one channel

### Stretch goals
- Publish an initial version of the audio playing library to NPM

### Findings
- NPM requires account to publish package; will do it later
- shell-player name already exists; will try to come up with another one
- Linux player wasn't working after the first sound was played
- Audio start delay is significant

### Achieved goals
- Fixed Linux player problems
- Came up with a possible solution for audio start delay

## 2023-08-20 - session A

### Planned goals
- Fix MP3 sound play
- Check viability of combining left and right channels

### Achieved goals
- MP3 sound is playing correctly, the problem was something else
- Stereo sound seems viable by interleaving samples
- aplay process reused successfully

## 2023-08-20 - session B

### Planned goals
- Make stereo sound play on Linux from MP3 file

### Stretch goal
- Come up with a name for our library to play sounds

### Achieved goals
- Make stereo sound play on Linux from MP3 file
- Wrote down player features

## 2023-10-17

### Planned goals
- Review project goal
- Review sound player code
- Refactor sound player code to class/functions
- Test result on Linux

### Findings
- aplay has its own buffer, that's why residual sounds happen
- aplay accepts a -B option to reduce read buffer size

### Decisions
- Buffer size: 50ms
- Accept only 44.1KHz sounds reusing process for better performance

### Achieved goals
- Reviews made
- Started refactoring player code
- Sounds played successfully on Linux

## 2023-10-18

### Planned goals
- Test with BGM (minutes-sized sound files)
- Replay cached audio file
- Allow multi-instance LinuxSoundPlayer/multiple process of aplay

### Findings
- Time to start playing 4 minutes MP3 sound:
  - First time: ~1.1s (measuring with a very suspicious method)
    - More likely taking ~600ms
  - Second time, after caching: ~400ms (measuring with a very suspicious method)
    - More likely almost 0ms
- Caching is very efficient
- Spawning aplay processes is somewhat efficient
  - Should measure that more precisely

### Achieved goals
- Test with BGM (minutes-sized sound files)
- Replay cached audio file

### Next steps
- Allow multi-instance LinuxSoundPlayer/multiple process of aplay

## 2023-10-19

### Planned goals
- Play simultaneous sounds
- Test with very large sound files
- Allow user to stop playing sound

### Achieved goals
- Play simultaneous sounds
- Test with very large sound files
- Allow user to stop playing sound

### Findings
- We're consuming twice as memory as should be needed
  - For instance, the expect memory consumption for a 1h audio
    is 176KB/s * 3600s = 0.60GB. We're consuming about 1.3GB.
  - During some seconds, memory consumption is actually once
    again doubled (2.6GB). That's expected because we receive
    separated channels data and interleave them. It takes a
    while before the separated channels become unused and
    garbage-collected.
- We may want to improve the sound player by interleaving
  samples while sending them to the aplay process, instead
  of doing the whole process at once. However, this won't
  make a lot of difference, since the interleaving process
  takes approximately 14% of the time of the decoding process.

## 2023-10-24

### Planned goals
- Make sure play/pause works on Windows
- Make sure caching sound file works on Windows

### Findings
- On interactive PowerShell, can run $MediaPlayer.Play() many times
  - On NodeJS env, process ends, so by default we can't do that
- $MediaPlayer has methods Pause() and Dispose()
- $MediaPlayer.NaturalDuration.TotalSeconds is what we want
  to know how many seconds to sleep
- We have to wait for the file to be loaded before reading the duration
- Following code simulates what occurs in the NodeJS child process:
  ```powershell
  $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New(); $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri('C:\Users\andre\p\fugaescorregadia\sound-player\bgm4m.mp3'); $MediaPlayer.Play(); $MediaPlayer.NaturalDuration
  ```

## 2023-10-25

### Planned goals
- Fix reading sound duration from file on Windows
- Make sure play/stop works on Windows

### Findings
- Windows doesn't support all the process signals that Linux does.
  Apparently, it supports only:
  - SIGTERM
  - SIGINT
  - SIGBREAK
  - SIGUSR1 and SIGUSR2
- We don't need to support pausing a sound for now
  - If we decide to do that in the future, we can use either signals or
    communication via sound player process's stdin

### Achieved goals
- Fix reading sound duration from file on Windows
- Make sure play/stop works on Windows

## 2023-10-26

### Planned goals
- Check if can play simultaneous sounds on Windows
- Make a playable demo with one level, bgm and sound fx
- Solve problem of different horizontal and vertical player speeds

### Achieved goals
- Can play simultaneous sounds on Windows
- Make a playable demo with one level, bgm and sound fx
- Solve problem of different horizontal and vertical player speeds
  - Came up with nice idea of duplicating characters, like @@ for player!
    - ...just like Bret Victor suggested! https://vimeo.com/38272912
- We have a fully-playable demo that actually looks like a real game!

## 2023-10-31

### Planned goals
- Check if demo is working properly on Linux
- Make audio adjustments
- Make .stop() method work on Linux
- Prefetch sound, avoiding taking a long time to start
- Avoid printing strange characters when moving
- POC to end aplay process faster

### Findings
- On Linux, console outputs keys pressed unless term.grabInput() is called
- Current sample BGM takes 2.5s to start playing (decoding time)
  - It also has 2s of silence
- mpg123-decoder works synchronously. This means that, even if we don't await
  for it, it still blocks JavaScript runtime.
  - For this reason, on Linux, we'll have to manage audio resources loading
    carefully. We'll have to inform the loading start and finish to the user.
- On Linux, stopping a sound (without loading another one) takes 700 to 800ms

### Achieved goals
- Check if demo is working properly on Linux
- Avoid printing strange characters when moving

### Next steps
- Prefetch sound, avoiding taking a long time to start
- End aplay process faster

## 2023-11-01

### Planned goals
- End aplay process faster

### Findings
- When aplay plays a WAV sound directly, it can't be stopped
  - Did not find why, but NodeJS seems to have little control
    over child processes
  - Maybe we should try the spawn function instead of exec?
- Writing small buffers many times worked: reduces delay from ~800ms to ~400ms
  - Buffer size =  32, setTimeout = 0: no music is heard; kill takes 134ms
  - Buffer size =  64, setTimeout = 0: no music is heard; kill takes 262ms
  - Buffer size = 128, setTimeout = 0: no music is heard; kill takes 507ms
  - Buffer size = 256, setTimeout = 0:  music is chopped; kill takes 507ms
  - Buffer size = 256,  no setTimeout:       music is ok; kill takes 677ms
  - Buffer size =  32,  no setTimeout:       music is ok; kill takes 680ms
    - But keyboard responsiveness is harmed

## 2023-11-07

### Planned goals
- End aplay process faster by one of the following means:
  - calling programs kill or killall directly
  - spawn function
- Review code

### Findings
- exec creates a shell; spawn doesn't
- spawn allows quickly killing aplay process via:
  - ~~spawn('kill', [aplayProcess.pid])~~ - doesn't work always
  - aplayProcess.kill() results in error
- Both exec and spawn take 2.1~2.3s to start playing song
- Killing aplay directly allows stopping sound in 31~39ms
  - ...and spawn gives direct access to aplay pid
- Killing spawned process with spawn('kill') sometimes throws Error

### Achieved goals
- End aplay process faster by using spawn instead of exec and later
  spawning Linux program 'kill'
- Tested also for WAV and it worked. 15~20ms to stop it.

### Next steps
- Fix errors caused when killing aplay process
- Test cork and uncork
- Test writing sub-buffers or full buffer at once
- Replace readFileSync with async version

