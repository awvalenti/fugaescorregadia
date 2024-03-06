$players = New-Object object[] 300
$filePath='C:\Users\andre\p\fugaescorregadia\audio\item.mp3'
foreach ($i in 0..($players.count - 1)) {
    $players[$i] = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
    $players[$i].Source = [Windows.Media.Core.MediaSource]::CreateFromUri($filePath)
}
do {
    $somePlayerIsStillLoading = $false
    foreach ($p in $players) {
        $loadedFinished = $p.PlaybackSession.PlaybackState -eq 'Paused'
        if (!$loadedFinished) {
            $somePlayerIsStillLoading = $true
            Start-Sleep -Milliseconds 1
            break
        }
    }
} while ($somePlayerIsStillLoading)
