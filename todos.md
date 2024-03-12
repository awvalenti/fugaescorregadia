# TODOs

## Legend
- 🧐: working on it
- ✅: done
- ❓: don't know yet
- ⏳: shall be done soon

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
    - Mojibake (shows wrong characters), must set character encoding correctly
- Decoded audio files are still named like *.mp3. Should use another extension.
- Linux: decoding some mp3 files generates noise

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
