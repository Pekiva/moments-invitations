(function () {
  var weddingDate = new Date('2027-06-14T14:00:00');

  function updateCountdown() {
    var now = new Date();
    var diff = weddingDate - now;

    if (diff <= 0) {
      diff = 0;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    setText('cd-days', days);
    setText('cd-hours', hours);
    setText('cd-minutes', minutes);
    setText('cd-seconds', seconds);
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  var form = document.getElementById('rsvp-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = 'Danke! Eure Rückmeldung wurde erfasst.';
      form.reset();
    });
  }
})();
