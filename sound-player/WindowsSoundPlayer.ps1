throw "Mojibake here --> ã"

$filePath = [string]$args[0]
$maxInstances = [int]$args[1]
$loop = [boolean]$args[2]

$players = New-Object object[] $maxInstances

foreach ($i in 0..($players.count - 1)) {
    # Uses WinRT / Windows Runtime API:
    # https://learn.microsoft.com/en-us/uwp/api/windows.media.playback.mediaplayer
    $players[$i] = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
    $players[$i].IsLoopingEnabled = $loop
    $players[$i].Source = [Windows.Media.Core.MediaSource]::CreateFromUri($filePath)
}

do {
    $somePlayerIsStillLoading = $false
    foreach ($p in $players) {
        $loadedFinished = $p.PlaybackSession.PlaybackState -eq 'Paused'
        if (!$loadedFinished) {
            $somePlayerIsStillLoading = $true
            Start-Sleep -Milliseconds 5
            break
        }
    }
} while ($somePlayerIsStillLoading)

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
