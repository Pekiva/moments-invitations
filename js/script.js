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

  var audio = document.getElementById('player-audio');
  var playBtn = document.getElementById('player-play');
  var seek = document.getElementById('player-seek');
  var currentEl = document.getElementById('player-current');
  var durationEl = document.getElementById('player-duration');
  var titleEl = document.getElementById('player-title');
  var artistEl = document.getElementById('player-artist');
  var trackButtons = document.querySelectorAll('.track-btn');

  function formatTime(seconds) {
    if (!isFinite(seconds)) return '00:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  if (audio && playBtn) {
    var firstTrack = trackButtons[0];
    if (firstTrack) audio.src = firstTrack.dataset.src;

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().catch(function () {
          status && (status.textContent = '');
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play', function () { playBtn.textContent = '⏸'; });
    audio.addEventListener('pause', function () { playBtn.textContent = '▶'; });

    audio.addEventListener('loadedmetadata', function () {
      durationEl.textContent = formatTime(audio.duration);
      seek.max = audio.duration || 0;
    });

    audio.addEventListener('timeupdate', function () {
      currentEl.textContent = formatTime(audio.currentTime);
      seek.value = audio.currentTime;
    });

    seek.addEventListener('input', function () {
      audio.currentTime = Number(seek.value);
    });

    trackButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        trackButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        titleEl.textContent = btn.dataset.title;
        artistEl.textContent = btn.dataset.artist;
        audio.src = btn.dataset.src;
        audio.play().catch(function () {});
      });
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxClose = document.getElementById('lightbox-close');
  var galleryButtons = document.querySelectorAll('#gallery-grid .gallery-placeholder');

  galleryButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!lightbox) return;
      lightbox.hidden = false;
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      lightbox.hidden = true;
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) lightbox.hidden = true;
    });
  }
})();
