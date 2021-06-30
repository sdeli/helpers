/* eslint-disable @typescript-eslint/no-var-requires */
var ffmpeg = require('ffmpeg');
try {
  new ffmpeg('/Users/sandordeli/Desktop/png-to-jpg/fassza.mp4', function (err: any, video: any) {
    if (!err) {
      console.log('The video is ready to be processed');
    } else {
      console.log('Error: ' + err);
    }
    // console.log('video');
    // console.log(video);
    video.setVideoSize('350x170', true, true, null).save('/Users/sandordeli/Desktop/png-to-jpg/jpg/fassza2.mp4', function (error: any, file: any) {
      console.log(error);
      if (!error) console.log('Video file: ' + file);
      console.log('done');
      console.log(file);
    });
  });
} catch (e) {
  console.log(e.code);
  console.log(e.msg);
}
