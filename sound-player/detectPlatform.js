export function detectPlatform() {
  const { platform } = process
  switch (platform) {
    case "win32": return 'WINDOWS'
    case "linux": return 'LINUX'
    case "darwin": return 'MAC'
    default: return `UNSUPPORTED_PLATFORM:${platform}`
  }
}
