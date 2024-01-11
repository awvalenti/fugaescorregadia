# TODOs

## Sound

### Features
- Pause/resume
  - ✅ Linux
  - ✅ Windows
  - ❓ Mac
- Split play() method into two phases: async prefetch() and start()
  - ✅ Linux
  - ✅ Windows
  - ❓ Mac
- Avoid code injection (e.g., by validating FORBIDDEN_CHARACTERS)
  - Linux
  - ✅ Windows
  - Mac
- Replaying a prefetched sound
  - Linux
  - ✅ Windows
  - Mac

### Refactorings
- Extract PowerShell code to .ps1 file

### Possible fixes
- Check if we need stuff like:
  ```javascript
  subprocessOutput.on('close', () => {
    subprocessOutput.removeAllListeners()
  })
  ```
