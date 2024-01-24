$filePath = $args[0]
$players = New-Object object[] $args[1]

foreach ($i in 0..($players.count - 1)) {
    # TODO Can we use New-Object Windows.Media.Playback.MediaPlayer?
    $players[$i] = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
    $players[$i].Source = [Windows.Media.Core.MediaSource]::CreateFromUri($filePath)
}

# TODO Some other way to check for readiness
do {
    $duration = $players[0].NaturalDuration.TotalSeconds
} while ($duration -eq 0)

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
