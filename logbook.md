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

### Stretch goals
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
- Consider writing decoded file to temp file

## 2023-11-08

### Planned goals
- Write down advantages of this method described above
- Write decoded audio stream to temp file

### Thoughts
- Advantages of writing the decoded audio stream to temp file:
  - Great reduction in memory consumption
  - Simplification of our code (e.g., won't have aplay kill errors)
  - Faster stopping of sounds (from 30~40ms to 15~20ms)

### Achieved goals
- Write down advantages of this method described above
- POC for writing decoded audio stream to temp file

### Next steps
- Compare results of writing temp file to reading stream from memory

## 2023-11-09

### Planned goals
- Analyze and fix bug of song playing after main process is finished
- Avoid code injection
- Compare results of writing temp file to reading stream from memory
- Organize existing code, removing unused parts

### Findings
- A disadvantage of writing decoded audio stream to temp file is that
  we have to keep track of playing sounds in order to end all those
  subprocesses when the main process ends.
- { detached: true } allows ending subprocesses with -pid. Don't know exactly
  how would this help.
- Possible solution: https://stackoverflow.com/a/11892107/2141469
- https://www.npmjs.com/package/tree-kill seemed like a solution, but I tested
  it and it worked strangely. The callback function was being called many times.

### Achieved goals
- Analyze bug of song playing after main process is finished
  - Possible solutions tried
  - For now, maybe should stick with:
    - process.on('exit', () => spawn('kilalll', ['aplay']))

## 2023-11-14

### Planned goals
- Analyze and fix bug of song playing after main process is finished
  - Test solution of piping decoded audio file to aplay process
- Compare results of: 1) reading from memory only; 2) writing temp file and playing it directly; 3) pipe temp file contents to aplay process
  - Observe memory consumption
- Organize existing code, removing unused parts
- Avoid code injection

### Findings
- Time taken to stop song on Linux: 5 ~ 11.5ms
- Memory consumption:
  - aplay process: constant (for temp file)
  - node process:
    - Looks constant for directly playing audio file
    - Ever-increasing when piping
      - Even if audio file finishes playing
- Time taken to start song:
  - Directly from memory: 2.2 ~ 2.4s
  - From temp file piping: 2.4 ~ 2.6s
  - From temp file directly: 2.4 ~ 2.5s

### Achieved goals
- Analyze and fix bug of song playing after main process is finished
  - Test solution of piping decoded audio file to aplay process
  - Compare results of: 1) reading from memory only; 2) writing temp file and playing it directly; 3) pipe temp file contents to aplay process

### Next steps
- Look for on-the-fly NodeJS MP3 decoder
- Test memory consumption using simple program playing WAV file
- Replace MPEGDecoder with MPEGDecoderWebWorker
- Try spawn options: { stdio: ['pipe', 'inherit', 'inherit'] }
- Try to fix memory leak to stick with pipe solution
- Try pipeline
- If unsuccessful, go back to reading file directly and solve the problem of
  song still playing after main process is finished

## 2023-11-15

### Planned goals
- Test memory consumption using simple program playing WAV file
  - Using ReadStream.pipe
  - Using ?.pipeline
  - Try spawn options: { stdio: ['pipe', 'inherit', 'inherit'] }
- Replace MPEGDecoder with MPEGDecoderWebWorker
- Try to fix memory leak to stick with pipe solution
- If unsuccessful, go back to reading file directly and solve the problem of
  song still playing after main process is finished

### Findings
- Tested playing WAV file on bare-bones program. It leaks memory, even
  if we manually close the ReadStream. Tested on NodeJS for Linux v18.17.0
  and v20.9.0. Should open an issue for that.
- If sound is fully played, memory is reclaimed
- pipeline also leaks memory

### Achieved goals
- Test memory consumption using simple program playing WAV file
  - Using ReadStream.pipe
  - Using ?.pipeline
  - Try spawn options: { stdio: ['pipe', 'inherit', 'inherit'] }
- Replace MPEGDecoder with MPEGDecoderWebWorker

## 2023-11-16

### Planned goals
- Test memory consumption using manual pipe
- Check if memory leak is real. If so, open an issue on NodeJS GitHub.

### Achieved goals
- Test memory consumption using manual pipe: leaks memory as well
- Created issue on NodeJS GitHub: https://github.com/nodejs/node/issues/50762

## 2023-11-17

### Planned goals
- Add details about memory leak problem on GitHub
- Organize code to play sound on Linux

### Findings
- ps may inform incorrect memory usage
  - Linux Mint's System Monitor too, possibly
- valgrind offers memory metrics collection, but is hard to use and visualize
- heaptrack / heaptrack_gui are much easier to use
  - https://github.com/KDE/heaptrack
- process.memoryUsage measures memory usage, but seems to be incorrect, too

### Achieved goals
- Add details about memory leak problem on GitHub:
  - https://github.com/nodejs/node/issues/50762#issuecomment-1821824590

## 2023-11-18

### Planned goals
- Replace problematic wall character on Windows
- Test sound play features (start, stop, bgm, sound fx)
- Read thread on GitHub issue

### Findings

### Colors
- PowerShell does not support color 'yellow'. It does support 'brightYellow'.

#### Unicode characters
- For outer walls, we were using ░ (light shade). It had two problems:
  - On PowerShell, for some font sizes, they don't connect, leaving empty
    horizontal space
  - On Windows Terminal with Git Bash, for some font sizes, they're simply gone
- █ (Full block, currently used for obstacles) works. The only problem is that,
  depending on font size, a 1-pixel-lenght line may appear, either horizontally
  or vertically.
- Medium and dark shades (▒ and ▓) have the same problems
- Blocks like ▟ would be good only if we didn't duplicate all characters
  - Since we're duplicating characters, we should find "symmetrical" characters
- Box drawings double:
  - Vertical (║) seems a good choice, gives a metal impression
  - Vertical and Horizontal (╬) is too heavy
  - ╠╣ make a nice steel-looking design, but may be out of context

#### Bug
- If we finish our level too fast, before bgm starts playing, an error is
  thrown, because stop method gets called on undefined

### Next steps
- Fix song stop bug
- Prefetch sounds, both on Linux and Windows
- Organize sound player code
- Furthur analyze memory consumption on Linux

### Achieved goals
- Replace problematic wall character on Windows
- Read thread on GitHub issue

## 2023-11-19

### Planned goals
- Fix song stop bug on Windows
- Avoid code injection on Windows sound player
- Prefetch sounds on Windows

### Findings
- Escape sequences on PowerShell scripts:
  - Backtick for double-quoted strings: "`n" is newline
  - Two single quotes for single-quoted strings: '''' is a single quote
- Double-quotes and newline are forbidden characters for filenames on Windows
  - …even though we can create such files using Git Bash
- Single-quotes are allowed and work
- Grave accent is a valid character for filenames, but not for URIs. So,
  we can't use them anyway.
- On Windows, time taken to load MP3 file is 50~100ms. How to measure:
  ```powershell
  $elapsedTime = Measure-Command {
    $FilePath="T:\00.temp\a\b.mp3"
    $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
    $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri($FilePath)
    do
    {
      $Duration = $MediaPlayer.NaturalDuration.TotalSeconds
    }
    while ($Duration -eq 0)
  }
  ```

### Achieved goals
- Fix song stop bug on Windows
- Avoid code injection on Windows sound player

### Next steps
- Validate sound file existence
- Try to extract PowerShell script code to .ps1 file
- Prefetch sounds on Windows

## 2023-11-28

### Planned goals
- Review memory leak problem
- Reproduce possible solution: call garbage collector
- Decide and implement Linux sound player stream reading

### Findings
- Memory was not actually leaking, it can be reclaimed by calling global.gc()
- Two options for implementing aplay stream management:
  1. Let aplay read the decoded audio directly
    - Pros:
      - simpler implementation
      - less memory usage
      - same implementation for MP3 and WAV source files
    - Cons:
      - hard to stop playing sounds when Node process finishes
  2. Read the decoded file stream and pipe it to aplay
    - Pros:
      - automatically stop playing sounds when Node process finishes
    - Cons:
      - complex implementation
      - high memory usage
      - risks of calling global.gc()
      - different implementations for MP3 and WAV

## 2023-11-29

### Planned goals
- Study sound prefetch implementation on Windows

### Next steps
- Evaluate usage of pipeline to free memory after pipe finishes. Source:
  https://github.com/nodejs/node/issues/50762#issuecomment-1830857896

### Findings
- Read-Host pauses a PowerShell script, waiting for user input on stdin
  - We can use this for inter-process communication

### Ideas
- Replace Start-Sleep with a second Read-Host, to keep the process alive

### Achieved goals
- Study sound prefetch implementation on Windows
  - POC done successfully:
    - Setting sound source will fetch audio
    - Read-Host after that will pause subprocess, waiting for parent process
      to signal that audio should start playing
    - Another Read-Host after that will keep subprocess alive, avoiding
      need to do Start-Sleep
  - Code:
    ```powershell
    $FilePath = "${resolvedPath}"
    $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
    $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri($FilePath)

    Read-Host
    $MediaPlayer.Play()
    Read-Host
    ```

### Next steps
- Change sound player API to split play() method into two phases:
  prefetch and play

## 2023-11-30

### Planned goals
- Model workflow for sound player on Linux
- Modify Linux sound player implementation to reduce memory usage

### Findings
- Apparently, this code snippet was unnecessary:
  - `aplayProcess.on('exit', () => { })`
- We can pause a sound by sending aplay either a SIGSTOP or SIGTSTP
  and resume it by sending it a SIGCONT
- We need to manually set buffer size of aplay in order to be able
  to stop it quickly
  - If buffer is too small, sound gets chopped
  - If buffer is too large, it takes too long to stop
  - -B 50000 (50ms) seems a good choice
- Workflow description:
  1. Create sound player
  2. Prepare it:
    - Load decoder
    - Create temp folder
  3. Decode a sound, writing a temp file
  4. Create aplay process reading that file. It will start playing immediately.
  5. If desired, send it a SIGSTOP to pause playback
    - Later on, send it a SIGCONT to resume playback
  6. If desired, send it a SIGINT to end it completetly
  7. After it finishes or receives a SIGINT, if user wants to play the same
    sound again, must create a new aplay process

### Achieved goals
- Model workflow for sound player on Linux

### Next steps
- See if it's viable not to explicitly set outputFormat, numberOfChannels and
  sampleRate, leaving for the decoder to auto-detec those data and use them
  when starting aplay
- Modify Linux sound player implementation to reduce memory usage
  - To do this, we need to write partial buffers
  - Fix promisify code

### Ideas
- Windows: isolate .ps1 script and call it like:
  - `spawn('powershell', ['play.ps1', soundfile])`
- Linux:
  - Check if exec subprocesses get closed when node process ends
    - If so, try to open a shell using exec and use it to spawn aplay processes

## 2023-12-06

### Planned goals
- Check if exec subprocesses get closed when node process ends
- Modify Linux sound player implementation to reduce memory usage

### Findings

#### Subprocess handling
- This code works for spawn, but not for exec:
  - `process.on('SIGTERM', () => { aplayProcess.kill() })`
- Signals:
  - SIGINT:
    - Sent by Ctrl-C
    - Immediately finishes subprocesses
    - Can be handled by Node
    - If handled, by default, does not end Node process
  - SIGTERM:
    - Sent by kill by default
    - Can be handled by Node
    - If handled, by default, does not end Node process
    - By default, Node process ends with code 143
      - When we handle this signal, we maybe should run
        `process.exit(143)`
  - SIGKILL:
    - Sent by kill -9
    - Cannot be handled by Node or ignored
- Uncaught exceptions:
  - `process.on('uncaughtException', (e) => { cleanup(); throw e; }` can be used to end subprocesses without losing the stack trace completely (only changing it a bit)
  - Together with handling SIGTERM, this may be the best choice so far

#### createWriteStream
- Seems not to work with promisify, must work with callbacks

## 2023-12-07

### Planned goals
- Modify Linux sound player implementation to reduce memory usage

### Findings
- Buffer.alloc is an alternative to new Float32Array
  - It seemed more efficient, but it actually took ~900ms instead of ~200ms to interleave samples

### Next steps
- Compare memory and time consumption for both approaches

## 2023-12-08

### Planned goals
- Compare memory consumption for both approaches
- Test pipeline memory consumption
- Finish Linux implementation to reduce memory usage

### Findings
- There are two decisions to make:
  1. Algorithm for writing decompressed audio data to file
  2. Method for sending decompressed audio data to aplay
- For the first part (writing data to file):
  - First implementation (writing full buffer at once):
    - Initially: ~500MB
    - After a few seconds: ~170MB (maybe ~46MB sometimes?)
  - Second implementation (writing partial Float32Array buffers):
    - Buffer size 4096:
      - Initially: ~360MB
      - After a few seconds: ~170MB
      - ~600ms
    - Buffer size 32768:
      - Initially: ~358MB
      - After a few seconds: ~170MB
      - ~250ms
    - Buffer size 131072:
      - Initially: ~358MB
      - After a few seconds: ~170MB
      - ~263ms
- pipeline also leaks memory
- Current BGM, when played in 2x frequency, gets played one octave above
  and sounds pretty good!

### Achieved goals
- Compare memory consumption for both approaches
- Test pipeline memory consumption
- Finish Linux implementation to reduce memory usage
  - Buffer size 32768 seems fine
  - Reduced memory consumption in approximately 30%
    (500MB to 360MB) and incresead processing time in 30%
    (200ms to 260ms)
  - This seems a good tradeoff

## 2023-12-12

### Planned goals
- Organize Linux implementation after POC is validated
- Look for a way to implement temp file descriptor on Linux

### Findings
- Can't work with pipeline because we have many buffers
  (e.g., left and right channel data)
- There's really no way to promisify fs.createWriteStream.
  Sticking with the callbacks implementation, to minimize
  creation of Promises objects.

### Achieved goals
- Partial organization of Linux implementation

## 2023-12-13

### Planned goals
- Finish Linux audio decode and interleave implementation
- Look for a way to implement temp file descriptor on Linux

### Problems
- PC stopped working during the live coding session!

## 2023-12-19

### Planned goals
- Finish Linux audio decode and interleave implementation
- Fix problem of keep playing sound after Node process is stopped
  - Look for a way to implement temp file descriptor on Linux
  - Find the code that runs by default when SIGINT is received
    and replicate it for the other signals

### Achieved goals
- Partial organization of Linux implementation
  - Full chunks apparently working
  - Residual chunk still needs work

## 2023-12-20

### Planned goals
- Finish Linux audio decode and interleave implementation
- Fix problem of keep playing sound after Node process is stopped
  - Look for a way to implement temp file descriptor on Linux
  - Find the code that runs by default when SIGINT is received
    and replicate it for the other signals

### Findings
- NodeJS only kills subprocesses for Ctrl-C, not when kill -s SIGINT is sent
  - process.on('beforeExit') or 'exit' are no good, too
- Look for a way to implement temp file descriptor on Linux
  - This might be possible only by calling C functions inside NodeJS

### Achieved goals
- Linux audio decode and interleave implementation is working

### Next steps
- Consider real-time Opus decoding

## 2023-12-22

### Planned goals
- Quick study of possible solutions for finishing aplay process
- Adopt quickest solution that solves present problems
- Pause/resume on Linux
- Split play() into async prefetch() and start()

### Findings
- process.on('beforeExit') or 'exit' don't run on Ctrl-C
- ...but process.on('exit') runs on uncaught exception!!

### Decisions
- Will keep simplest solution for finishing aplay processes for now:
  - `process.on('exit', () => { spawn('killall', ['aplay']) })`
  - This suffices for stopping sounds during development, which is our
    actual problem today

### Achieved goals
- Quick study of possible solutions for finishing aplay process
- Adopt quickest solution that solves present problems
- Pause/resume on Linux
- Split play() into async prefetch() and start()

### Next steps
- Read above line 636 to find out next steps
- Pause/resume on Linux
- Celebrate Xmas 🎄🎄!
- Celebrate New Year 🎄🎄!

## 2024-01-09

### Planned goals
- On Windows:
  - Change audio API to support prefetch/start/pause/resume/stop methods

### Findings
- Thought it was possible to write simply:
  ```powershell
  `n
  ```
  - …to produce a newline, but it's not. Must write one of these:
  ```powershell
  "`n"
  Write-Host `n
  ```
- Read-Host reads from stdin. But it also echoes it to stdout.
  - Tried > dummy-file, | Out-Null, but these seem to only work sometimes
- Tried paused and flowing mode from ReadStream. Both seemed the same.
- Using mediaPlayerProcess.stdout.on('data', (chunk) => {}):
  - chunk is randomly set to 'a\r\n', 'a' then '\r\n'
  - We need more control over it. The solution may be to use 'readline' module:
    ```javascript
    const readline = require('readline');

    const readableStream = getReadableStream();
    const rl = readline.createInterface({
      input: readableStream,
      crlfDelay: Infinity // Handle different line endings
    });

    rl.on('line', (line) => {
      processLine(line);
    });
    ```

### Next steps
- Remove prefetch delay
  - Test this by showing game board in sync with bgm
  - In other words, wait until sound is loaded to show the board

## 2024-01-10

### Planned goals
- Change audio API to support prefetch/start/pause/resume/stop methods
- Read-Host without echoing output
- readline module to read from subprocess stdout

### Findings
- node:readline/promises
  - Makes no sense
  - Apparently, requires this idiom to read lines:
    ```javascript
    for await (const line of rl) {
      // do something with line
    }
    ```

### Achieved goals
- Read-Host without echoing output
- readline module to read from subprocess stdout

### Next steps
- Move prefetching sounds to sooner so that we can draw the game
  board only when sounds are loaded
- Check if we need stuff like:
  ```javascript
  subprocessOutput.on('close', () => {
    subprocessOutput.removeAllListeners()
  })
  ```

## 2024-01-11

### Planned goals
- Support pause/resume on Windows
- Move prefetching sounds to sooner so that we can draw the game
  board only when sounds are loaded

### Achieved goals
- Support pause/resume on Windows
- Move prefetching sounds to sooner so that we can draw the game
  board only when sounds are loaded
- Game code refactored: variables are grouped and code is organized in functions
- Audio implementation mostly done!

### Next steps
- On Linux, implement item collecting
- Put two items on same level and collect them
  - This will bring the need to implement replaying a prefetched sound
    - …which should already be working on Windows
    - …and should then be implemented on Linux

## 2024-01-16

### Planned goals
- Implement item collecting
- Play sound fx for it

### Achieved goals
- Implement item collecting
- Play sound fx for it

### Next steps
- Parallel playing feature on Windows

## 2024-01-17

### Planned goals
- Parallel playing feature on Windows
- More than one level

### Findings
- We can make $MediaPlayer.Position = 0 to restart a sound
  - This would be the simplest implementation
  - However, pop noises may occur. Undesirable.
- Other possibilities:
  - Enqueing to play after sound finishes
  - Pausing, sleeping for a few millisenconds and playing again
    - Tried it and worked very well!
  - Creating another MediaPlayer object with same properties and check
    whether it loads sound immediately, relying on some cache
    - Didn't work
- MediaPlayer object has a property called PlaybackSession
  - It has a property called PlaybackState
    - Starts as None
    - Moves to Paused when sound is loaded
    - Moves to Playing when Play() is called
    - Moves back to Paused when sound finishes playing
- On a real scenario with many items together, sound experience is affected
- Reconsidering the full, complex implementation of playing parallel sounds
  - There might be a solution that does not require creating many processes
  - Actually, one single PowerShell process may manage many instances of
    MediaPlayer

### Achieved goals
- "Parallel playing" feature on Windows (actually, only one at a time)
- More than one level

## 2024-01-18

### Planned goals
- Really parallel playing feature on Windows

### Thoughts
- Possibilities of implementation:
  - Single subprocess managing single instance of some other media player class
    - ...or another usage of Windows.Media.Playback.MediaPlayer that doesn't
  - Single subprocess managing array of instances of Windows.Media.Playback.MediaPlayer
  - Multiple subprocesses
- Should evaluate possible high memory consumption

### Findings
- Single subprocess managing single instance of some other media player class
  - Seems inviable
- Memory consumption: almost 0!
- Single subprocess managing array of instances of Windows.Media.Playback.MediaPlayer
  - Worked like a charm!
  - Play() on instance (index + 1) % count seems to work well

### Achieved goals
- Really parallel playing feature on Windows

### Next steps
- Fix pause/resume/stop features to work with many player instances

## 2024-01-23

### Planned goals
- Fix pause/resume/stop features to work with many player instances
- Rename prefetch to load
- Refactor powershell script code
  - Extract to .ps1 file
  - Rename vars
  - Improve array code style
  - Use New-Object instead of (...)::New()

### Questions
- Should levelClear sound have maxInstances = 1 or 2?
  - What should happen if level is cleared, song starts and, before it
    finishes, another level is cleared?
  - Should two songs play in parallel?
  - Should one song stop previous one and a new one start?
  - Should maxInstances = 1 mean that starting an already playing sound
    should stop previous instance and start a new one? Or should the request
    simply be ignored?

### Findings
- Running .ps1 file externally:
  - Can use $args[0] to know which file to load
  - There may be security restrictions. Details:
    - https://www.netspi.com/blog/technical/network-penetration-testing/15-ways-to-bypass-the-powershell-execution-policy/

### Achieved goals
- Fix pause/resume/stop features to work with many player instances
- Rename prefetch to load
- Rename vars

### Next steps
- Assess viability of extracting .ps1 file
- Some other way to check for readiness
- Improve array code style
- Use New-Object instead of (...)::New()

## 2024-01-24

### Planned goals
- Extract .ps1 file
- Some other way to check for readiness
- Improve array code style
- Use New-Object instead of (...)::New()

### Findings
- Top-level await for an unsettled promise (returning undefined) makes NodeJS
  exit with error code 13
- subprocessOutput.on('error') seemed not to work. But actually there were no
  errors reading from stdout. The subprocess error was sent to its stderr.
  - Actually, we need to read from stderr too. Added a draft code for that.
- Running powershell:
  - Code as string inside js code: 1.3 ~ 1.4s to start playing bgm
  - External .ps1 file:
    - Via spawn, bypassing ExecutionPolicy: 1.3s ~ 1.5s to start playing bgm
    - Via exec, replacing string: ~1.5s to start playing bgm

### Decisions
- mediaPlayerProcess.kill() was chosen instead of sending a 'stop' command to
  its stdin. It's faster.

### Achieved goals
- Extract .ps1 file
  - Tried reading it as a string and passing it to exec
  - Tried passing file directly to powershell command

## 2024-01-30

### Planned goals
- Fix bug: on Windows, when powershell process fails, finishes program
- Resolve TODOs of powershell code

### Findings
- ReadableStream
  - close event is always emitted (if it is created with the emitClose option)
    - No more events will be emitted
  - data event is emitted when there's data, after on('data') listener is added
    - If readable.setEncoding() is called, receives String; otherwise, Buffer.
  - end event is emitted after all data have been consumed
  - error event can ben emitted at any time
  - destroy(error?) method will close the stream

### Questions
- Does readableStream automatically removes all listeners on('close')?

### Achieved goals
- Fix bug: on Windows, when powershell process fails, finishes program
- Resolve 1 TODO of powershell code

### Next steps
- Fix 2nd TODO: Some other way to check for readiness

## 2024-01-31

### Planned goals
- Fix 2nd TODO: Some other way to check for readiness

### Findings
- The MediaPlayer class we're using belongs to WinRT / Windows Runtime API:
  - https://learn.microsoft.com/en-us/uwp/api/windows.media.playback.mediaplayer
- PowerShell (non-core) can't handle WinRT events
- AutoPlay property supposedly allows autoplaying after medium file loads
- For future compatibility, better use $mediaPlayer.PlaybackSession.PlaybackState instead of $mediaPlayer.CurrentState
  - PlaybackState is a System.Enum
- Enum comparison with -eq ignores case and accepts any prefix string, like None -eq 'non' :O
- PowerShell allows selecting, cuting, copying and pasting text directly on
  the terminal!! 👏
  - …but unfortunately can't move cursor using mouse

### POC
- Following code tested busy-wait loop for polling sound loading:
  ```powershell
  $i=0;$filePath='C:\Users\andre\p\fugaescorregadia\audio\item.mp3';$players = New-Object object[] 1; $players[$i] = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New();   $ultimo = $players[$i].PlaybackSession.PlaybackState;  $players[$i].Source = [Windows.Media.Core.MediaSource]::CreateFromUri($filePath); $j=0; write-host  $j $ultimo; for (; $j -lt 20000;++$j) { if ($ultimo -ne $players[$i].PlaybackSession.PlaybackState) {Write-Host $j $ultimo $players[$i].PlaybackSession.PlaybackState; $ultimo = $players[$i].PlaybackSession.PlaybackState}}write-host $j 'busy-wait iterations completed'
  ```
  - Found that, for item.mp3, a very short sound, states change as:
    - Starts as None
    - Moves to Opening when Source property is set
    - Moves to Paused when sound finishes loading (6000~12000 iterations)

### Achieved goals
- Found that polling is only option to check for readiness

### Next steps
- Make check work for maxInstances > 1

## 2024-03-04
- We're back!

### Planned goals
- Replace double characters with something that makes more sense

### Findings
- Currently, it's a little confusing that there are two different ways of
  outputing characters/text:
  - Game elements occupy two spaces each
  - Real text occupies one space per character
- Tried pairing characters:
  - `[]`: looks like something's missing from inside it
  - `{}`: looks like some alien object
  - `()`: looks like a hole
  - `<>`: looks like a sword or a spaceship
  - `/\` and `\/`: look like arrows
  - `$` followed by many symbols: don't make much sense
  - `/|` and variations: don't look like anything
  - `|>` and `<|`: look awesome when font has ligatures, but look bad
  when it doesn't
  - `)>`, `]>`, `}>`: looks kinda good with paren, bad with the other ones. Can
  be left and right arrows.
  - `!?`, `:;` and variations: bad
  - `~^`: looks like a mountain
    - `^~`: messes up with the shell!
  - `^z`: looks like a wave
  - `?|`, `|?`: look like ?-boxes, especially when in sequence
- One possibility: nerd references:
  - `~/`, `~1` etc.
- This image suggests that we can put dots or underscores on empty
spots and print nothing where we identify as dark, where the player doesn't
know what is there: https://media.moddb.com/images/groups/1/8/7792/20u1imo.gif

### Achieved goals
- Studied posibilities for replacing double characters and documented findings

## 2024-03-05

### Planned goals
- Replace double characters with something that makes more sense
- Windows/PowerShell: load sounds without busy-wait loop
  - Make it work with maxInstances > 1

### Findings

#### Characters
- How do characters look on Windows terminals:
  - WT/GitBash: lighter, better-looking colors, especially for dark blue
  - PurePowerShell: dark blue is almost invisible
  - CMD: same colors of WT/GitBash, same font of PurePowerShell
  - CMD and PureGitBash have same colors, but different fonts
  - PurePowerShell and PureGitBash have similar colors, except dark blue
  - To sum up:
    - PurePowerShell looks the worst
    - WT/PowerShell looks great, exactly the same as WT/GitBash

#### Fonts with ligatures
- `<>`: looks great on Windows with Cascadia Code PL font
- On the other hand, even if two characters have different colors, if they
form a ligature, they are presented that way
- This will be a problem, especially when printing two different elements
- We should choose characters that don't form ligatures when adjacent

#### Windows: load many sound player instances
- Working!
- Sleeping doesn't seem to change CPU usage

### Achieved goals
- Replace double characters with something that makes more sense
- Windows/PowerShell: load sounds without busy-wait loop
  - Make it work with maxInstances > 1

### Next steps
- Better evaluation of CPU and RAM consumption when loading sounds on Windows

## 2024-03-06

### Planned goals
- Evaluation of CPU and RAM when loading sounds on Windows
- Audio looping on Windows

### Findings
- On PowerShell, tried busy and idle waiting:
  - `for (;;){}` consumes 14% CPU
  - `for (;;){Start-Sleep -Milliseconds 1}` consumes 0%
- Tried different values: 1ms, 500ms, 1s, 5s, 10s... All resulted in more or
  less the same CPU usage.
  - So, it's because of Windows's built-in sound loading, not our .ps1 program
- It's awesomely simple to loop sounds on Windows: just set `IsLoopingEnabled`!

### Decisions
- It seems some Sleep value makes it a little better than nothing. So, we'll
  just set it to 5ms.

### Achieved goals
- Evaluation of CPU and RAM when loading sounds on Windows
- Audio looping on Windows

## 2024-03-11

### Planned goals
- After game runs, terminal gets messed up (e.g., loses cursor)
- Investigate bugs when PowerShell fails:
  - Exits Node process
  - Shows wrong characters (mojibake)

### Findings
- term.hideCursor(false) shows the cursor again
- term.processExit(0) and process.exit(0) both terminate Node process
  - Don't know exactly the differences between them
  - Only know that term.processExit prints an empty line on terminal and
  process.exit doesn't. So, we're using the latter for now.
- PowerShell process is taking some seconds to start running. Why?
- Mojibake is the same for every terminal in Windows
- mediaPlayerProcess.on('exit', errorCode) handles PowerShell failure
  - 'close' too. Which one is better?

### Achieved goals
- Fixed losing cursor on Windows
- Investigate bugs when PowerShell fails:
  - Exits Node process: because promise finishes unfulfilled
  - Began writing solution for that

### Next steps
- PowerShell process is taking some seconds to start running. Why?

## 2024-03-12

### Planned goals
- Recover original terminal colors on Linux
- Loop song on Linux

#### Stretch goals
- Extract class to represent a sound being played

### Findings
- terminal-kit ANSI colors:
  ```javascript
  const colorNameToIndexDict = {
    // ANSI
    black: 0 ,
    red: 1 ,
    green: 2 ,
    yellow: 3 ,
    blue: 4 ,
    magenta: 5 ,
    violet: 5 ,
    cyan: 6 ,
    white: 7 ,
    grey: 8 ,
    gray: 8 ,
    brightblack: 8 ,
    brightred: 9 ,
    brightgreen: 10 ,
    brightyellow: 11 ,
    brightblue: 12 ,
    brightmagenta: 13 ,
    brightviolet: 13 ,
    brightcyan: 14 ,
    brightwhite: 15
  } ;
  ```
- According to ChatGPT and Gemini about subrprocesses in NodeJS:
  - 'exit' event is fired when process starts to finish. It sends exit code.
  - 'close' event is fired only when process has cleaned up its resources.

### Achieved goals
- Recover original terminal colors (and whole state) on Linux
- Loop song on Linux

## 2024-03-13

### Planned goals
- Fix: PowerShell process is taking some seconds to start running. Why?
- Fix: mojibake
- Handling default options in a standard, clean way

#### Stretch goals
- Decoded files extension should not be mp3

### Findings
- Loading times:
  - Running PowerShell script directly via WT/Git Bash: 660ms
  - Running PowerShell script via NodeJS process: 750ms
  - SoundPlayer: 10ms to import
  - terminal-kit:
    - 115ms to import
    - 250ms to setup
  - We can setup terminal-kit in parallel with loading sounds to gain time
  - NodeJS also has await import() for async loading modules
  - spawn or exec take about the same time (650 ~ 750ms)
  - Can't improve PowerShell subprocess loading time
    - What we can improve is modules importing and terminal-kit setup
- Mojibake:
  - If we run script directly from PowerShell:
    - Error messages automatically generated get printed correctly
    - Error messages generated by user code become messed up, unless script is
      saved in Latin-1 encoding
  - If we run script from NodeJS:
    - All error messages become messed up
    - NodeJS uses UTF-8 by default. Tried changing it to Latin-1, without
    success.

### Achieved goals
- PowerShell process taking some seconds to start running
- Understanding of the mojibake problem

## 2024-03-18

### Planned goals
- Fix PowerShell mojibake

### Findings
- The mojibake problem has many layers of character encoding misuse
- Running powershell from Git Bash/WT generates correct output on the terminal,
  but wrong output when redirected to a file
  - I say wrong because it's really messed up. It's not UTF-8/16/etc., not
    Latin-1, not Windows-1252, not anything.
- This problem is really complex and is not worth the effort to fix
- In short, it's a wontfix

### Achieved goals
- Decided not to fix PowerShell mojibake bug

