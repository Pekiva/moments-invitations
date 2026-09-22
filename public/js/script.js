(function () {
  var weddingDate = new Date('2027-06-14T14:00:00');
  var rsvpDeadline = new Date('2027-05-01T23:59:59');

  function updateCountdown() {
    var now = new Date();
    var diff = Math.max(0, weddingDate - now);

    setText('cd-days', Math.floor(diff / (1000 * 60 * 60 * 24)));
    setText('cd-hours', Math.floor((diff / (1000 * 60 * 60)) % 24));
    setText('cd-minutes', Math.floor((diff / (1000 * 60)) % 60));
    setText('cd-seconds', Math.floor((diff / 1000) % 60));
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  var rsvpCountdownEl = document.getElementById('rsvp-countdown');
  if (rsvpCountdownEl) {
    var daysLeft = Math.ceil((rsvpDeadline - new Date()) / (1000 * 60 * 60 * 24));
    rsvpCountdownEl.textContent = daysLeft > 0
      ? 'Noch ' + daysLeft + ' Tag' + (daysLeft === 1 ? '' : 'e') + ' Zeit für eure Zusage.'
      : 'Die Anmeldefrist ist abgelaufen.';
  }

  var form = document.getElementById('rsvp-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = 'Danke! Eure Rückmeldung wurde erfasst.';
      form.reset();
    });
  }

  var playBtn = document.getElementById('player-play');
  var seek = document.getElementById('player-seek');
  var currentEl = document.getElementById('player-current');
  var durationEl = document.getElementById('player-duration');
  var ytPlayer = null;
  var ytReady = false;
  var seeking = false;

  function formatTime(seconds) {
    if (!isFinite(seconds)) return '00:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  window.onYouTubeIframeAPIReady = function () {
    if (!document.getElementById('youtube-player')) return;
    ytPlayer = new YT.Player('youtube-player', {
      videoId: '6_8FWYetqZs',
      playerVars: { controls: 0, disablekb: 1 },
      events: {
        onReady: function () {
          ytReady = true;
          durationEl.textContent = formatTime(ytPlayer.getDuration());
          seek.max = ytPlayer.getDuration() || 0;
        },
        onStateChange: function (event) {
          playBtn.textContent = event.data === YT.PlayerState.PLAYING ? '⏸' : '▶';
        },
      },
    });
  };

  if (playBtn) {
    playBtn.addEventListener('click', function () {
      if (!ytReady) return;
      if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
    });
  }

  if (seek) {
    seek.addEventListener('input', function () { seeking = true; });
    seek.addEventListener('change', function () {
      if (ytReady) ytPlayer.seekTo(Number(seek.value), true);
      seeking = false;
    });
  }

  setInterval(function () {
    if (!ytReady || seeking) return;
    var current = ytPlayer.getCurrentTime();
    currentEl.textContent = formatTime(current);
    seek.value = current;
  }, 500);

  var galleryStatus = document.getElementById('gallery-status');
  var photoUpload = document.getElementById('photo-upload');
  var galleryLink = document.getElementById('gallery-link');

  if (galleryLink) {
    fetch('/api/gallery-link')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.url) galleryLink.href = data.url;
      })
      .catch(function () {});
  }

  if (photoUpload) {
    photoUpload.addEventListener('change', function () {
      var files = photoUpload.files;
      if (!files || files.length === 0) return;

      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
      }

      if (galleryStatus) galleryStatus.textContent = 'Lädt hoch …';

      fetch('/api/photos', { method: 'POST', body: formData })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.error) {
            if (galleryStatus) galleryStatus.textContent = data.error;
            return;
          }
          if (galleryStatus) galleryStatus.textContent = 'Danke fürs Teilen!';
          photoUpload.value = '';
        })
        .catch(function () {
          if (galleryStatus) galleryStatus.textContent = 'Upload fehlgeschlagen. Bitte erneut versuchen.';
        });
    });
  }
})();
