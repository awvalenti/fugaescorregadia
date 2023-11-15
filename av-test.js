import AV from 'av';
import 'mp3';
import 'aac';

// const p = AV.Player.fromFile('audio/adrift-bgm-cropped.mp3')
// p.play()
setTimeout(() => {
  console.log('finish');
}, 3000);

var asset = AV.Asset.fromFile("some-song.m4a")
asset.decodeToBuffer(function(buffer) {
  // buffer is now a Float32Array containing the entire decoded audio file
  console.log(buffer);
});
