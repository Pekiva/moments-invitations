(function () {
  var name = '';
  var attending = 'yes';
  try {
    name = window.sessionStorage.getItem('rsvp-name') || '';
    attending = window.sessionStorage.getItem('rsvp-attending') === 'no' ? 'no' : 'yes';
  } catch (e) {}

  var titleEl = document.getElementById('thanks-title');
  var textEl = document.getElementById('thanks-text');
  var detailsEl = document.getElementById('thanks-details');
  var emojiEl = document.getElementById('thanks-emoji');

  function render() {
    var t = window.i18n.t;
    titleEl.textContent = t('thanks_title_' + attending)(name);
    textEl.textContent = t('thanks_text_' + attending);
    detailsEl.textContent = attending === 'yes' ? t('thanks_details_yes') : '';
    emojiEl.textContent = attending === 'yes' ? '🎉' : '💌';
  }

  render();
  document.addEventListener('languagechange', render);
})();
