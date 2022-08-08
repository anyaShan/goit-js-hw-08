import vimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');
const player = new vimeoPlayer(iframeEl);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
  const currentTime = event.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
}

const savedTime = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(savedTime);
