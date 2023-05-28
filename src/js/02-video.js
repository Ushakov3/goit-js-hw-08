import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const saveCurrentTime = function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

const currentTime = function (evt) {
  throttledSaveCurrentTime(evt.seconds);
};

player.on('timeupdate', currentTime);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const time = localStorage.getItem('videoplayer-current-time');
reloadPage(time);

function reloadPage(time) {
  if (time) {
    player
      .setCurrentTime(time)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            break;

          default:
            break;
        }
      });
  }
}
