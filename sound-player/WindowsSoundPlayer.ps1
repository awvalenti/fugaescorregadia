$filePath = $args[0]
$players = New-Object object[] $args[1]

foreach ($i in 0..($players.count - 1)) {
    # Uses WinRT / Windows Runtime API:
    # https://learn.microsoft.com/en-us/uwp/api/windows.media.playback.mediaplayer
    # $players = New-Object object[] 1
    # $i = 0
    $players[$i] = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
    $players[$i].Source = [Windows.Media.Core.MediaSource]::CreateFromUri($filePath)
    # $p = $players[0]
}

do {} while (
    # FIXME Only works for size 1
    $players | ForEach-Object { $_.PlaybackSession.PlaybackState -eq 'Paused' }
)

Write-Host 'ready'

$currentIndex = -1

for (;;) {
    switch ([Console]::ReadLine()) {
        'start' {
            $currentIndex = ($currentIndex + 1) % $players.count
            $players[$currentIndex].Play()
        }
        'pause' { $players[$currentIndex].Pause() }
        'resume' { $players[$currentIndex].Play() }
    }
}
