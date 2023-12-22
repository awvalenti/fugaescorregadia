# Ideas

## Linux: automatically finishing aplay processes
- See if it's viable not to explicitly set outputFormat, numberOfChannels and
  sampleRate, leaving for the decoder to auto-detec those data and use them
  when starting aplay
- Open a shell using exec and use it to spawn aplay processes
