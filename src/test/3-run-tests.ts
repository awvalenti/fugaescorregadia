const runner = mocha.run()

runner.on('end', () => {
  const icon = runner.failures === 0 ? '✔️' : '❌'
  document.title = icon
  document.getElementById('test-running-indicator')!.className = icon
})
