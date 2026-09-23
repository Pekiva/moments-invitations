(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  var envelopeGate = document.getElementById('envelope-gate');
  if (envelopeGate) {
    document.documentElement.style.overflow = 'hidden';
    envelopeGate.addEventListener('click', function () {
      envelopeGate.classList.add('opening');
      document.documentElement.style.overflow = '';
      setTimeout(function () {
        envelopeGate.hidden = true;
      }, 500);
    }, { once: true });
  }

  var eventDate = new Date('2026-11-07T18:00:00');
  var rsvpDeadline = new Date('2026-10-18T23:59:59');

  function updateCountdown() {
    var now = new Date();
    var diff = Math.max(0, eventDate - now);

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
  var daysLeft = Math.ceil((rsvpDeadline - new Date()) / (1000 * 60 * 60 * 24));

  function renderRsvpCountdown() {
    if (!rsvpCountdownEl) return;
    rsvpCountdownEl.textContent = daysLeft > 0
      ? window.i18n.t('rsvp_days_left')(daysLeft)
      : window.i18n.t('rsvp_expired');
  }
  renderRsvpCountdown();

  var form = document.getElementById('rsvp-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var formData = new FormData(form);
      var payload = {
        name: formData.get('name'),
        attending: formData.get('attending'),
        guests: formData.get('guests'),
        guestNames: formData.get('guest-names'),
        message: formData.get('message'),
      };

      status.textContent = window.i18n.t('form_sending');

      fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          if (!result.ok) {
            status.textContent = window.i18n.t('err_' + result.data.code) || result.data.error;
            return;
          }
          status.textContent = window.i18n.t('form_thanks');
          form.reset();
        })
        .catch(function () {
          status.textContent = window.i18n.t('err_rsvp_failed');
        });
    });
  }

  document.addEventListener('languagechange', renderRsvpCountdown);

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
          var playing = event.data === YT.PlayerState.PLAYING;
          playBtn.textContent = playing ? '⏸' : '▶';
          playBtn.setAttribute('aria-label', window.i18n.t(playing ? 'player_pause' : 'player_play'));
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

  var musicSection = document.getElementById('music');
  if (musicSection && 'IntersectionObserver' in window) {
    var autoplayTriggered = false;
    var musicObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !autoplayTriggered && ytReady) {
          autoplayTriggered = true;
          ytPlayer.playVideo();
          musicObserver.disconnect();
        }
      });
    }, { threshold: 0.6 });
    musicObserver.observe(musicSection);
  }

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

      if (galleryStatus) galleryStatus.textContent = window.i18n.t('gallery_uploading');

      fetch('/api/photos', { method: 'POST', body: formData })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.error) {
            if (galleryStatus) galleryStatus.textContent = window.i18n.t('err_' + data.code) || data.error;
            return;
          }
          if (galleryStatus) galleryStatus.textContent = window.i18n.t('gallery_thanks');
          photoUpload.value = '';
        })
        .catch(function () {
          if (galleryStatus) galleryStatus.textContent = window.i18n.t('gallery_upload_failed');
        });
    });
  }
})();
