# TODOs

## Sound

### Features
- Song loop
  - Linux
  - Mac
  - Windows
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
- Replace duplicated characters with something that looks more like a single
  element, like [], {} etc.
  - This was most critical for items with $: $$$$ should be two adjacent items,
    but look like four

### Bugs
- Linux: terminal changes color
- All OSs: messes up terminal (e.g., loses cursor)
- When PoSh subprocess fails, should not end app

### Refactorings
- Extract PowerShell code to .ps1 file
- Create function to play sound and call it

### Possible fixes
- Check if we need stuff like:
  ```javascript
  subprocessOutput.on('close', () => {
    subprocessOutput.removeAllListeners()
  })
  ```
