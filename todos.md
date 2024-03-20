# TODOs

## Legend
- 🧐: working on it
- ✅: done
- ❓: don't know yet
- ⏳: shall be done soon
- ❌: won't fix

## Single Executable Application
- Set icon
  - https://github.com/nodejs/single-executable/discussions/67
- If run via file explorer, should a terminal automatically be opened?

## Sound

### Features
- Song loop
  - ✅ Linux
  - Mac
  - ✅ Windows
- Pause/resume
  - ✅ Linux
  - ❓ Mac
  - ✅ Windows
- Split play() method into two phases: async load() and start()
  - ✅ Linux
  - ❓ Mac
  - ✅ Windows
- Avoid code injection (e.g., by validating FORBIDDEN_CHARACTERS)
  - Linux
  - Mac
  - ✅ Windows
- Replaying a sound
  - Linux
  - Mac
  - ✅ Windows
- Preemptively playing a sound (stopping other instances, if running)

### Design
- Add level clearing animation

## Bugs
- All OSs: messes up terminal (e.g., loses cursor)
  - ✅ Windows: losing cursor
  - ✅ Linux: losing cursor
  - ✅ Linux: terminal changes color
  - ❓ Mac
- Windows
  - When PoSh subprocess fails, should not end app
  - ⏳ When powershell fails:
    - Exits program
      - This is because load() promise finishes unsettled
    - ❌ Mojibake (shows wrong characters), must set character encoding correctly
- Decoded audio files are still named like *.mp3. Should use another extension.
- Linux
  - Plays mostly noise for mp3 file with (apparently) corrupt header
  - Should accept mp3 files that don't have 2 channels (`-c 2` arguments)

## Refactorings
- Extract class to represent a sound being played
- Handling default options in a standard, clean way

## Possible fixes
- Check if we need stuff like:
  ```javascript
  subprocessOutput.on('close', () => {
    subprocessOutput.removeAllListeners()
  })
  ```
