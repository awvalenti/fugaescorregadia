# TODOs
🧐: working on it

## Sound

### Features
- Song loop
  - Linux
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

### Bugs
- Windows
  - When powershell fails:
    - Exits program
      - This is because load() promise finishes unsettled
    - Mojibake (shows wrong characters), must set character encoding correctly
- Linux: terminal changes color
- All OSs: messes up terminal (e.g., loses cursor)
- When PoSh subprocess fails, should not end app

### Refactorings
- Extract class to represent a sound being played

### Possible fixes
- Check if we need stuff like:
  ```javascript
  subprocessOutput.on('close', () => {
    subprocessOutput.removeAllListeners()
  })
  ```
