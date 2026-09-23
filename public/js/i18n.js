(function () {
  var STORAGE_KEY = 'moments-lang';
  var DEFAULT_LANG = 'sr';

  var translations = {
    sr: {
      page_title: 'Peki slavi 30. rođendan',
      page_description: 'Pozivnica za 30. rođendan — pridružite se proslavi!',
      envelope_hint: 'Tapni da otvoriš pozivnicu',
      turns30: 'puni 30',
      date_text: '07. novembar 2026. · 18:00',
      dresscode: 'Dress code: stil 90-ih',
      cta_rsvp: 'Potvrdi dolazak',
      nav_message: 'Za vas',
      nav_details: 'Dress code',
      nav_gallery: 'Trenuci',
      nav_rsvp: 'Potvrda',
      quote1: 'Kažu da su najlepši trenuci oni provedeni sa ljudima koje volimo.',
      quote2: 'Zato želim da moj 30. rođendan pretvorim u veče kojeg ćemo se svi zauvek sećati.',
      quote3: 'Dođite da proslavimo zajedno — jedva čekam da vas vidim!',
      location_heading: 'Proslava',
      map_link: 'Pogledaj na mapi ↗',
      venue_time: 'Početak u 18:00',
      ablauf_heading: 'Dress code inspiracija',
      countdown_heading: 'Zajedno brojimo dane',
      label_days: 'Dana',
      label_hours: 'Sati',
      label_minutes: 'Minuta',
      label_seconds: 'Sekundi',
      music_heading: 'Moja pesma',
      gallery_intro: 'Podelite sa mnom svoje najlepše trenutke sa slavlja!',
      btn_upload: 'Dodaj fotografije',
      btn_gallery: 'Pogledaj galeriju',
      rsvp_heading: 'Potvrdite svoj dolazak',
      rsvp_intro: 'Molimo potvrdite dolazak najkasnije do <strong>18. oktobra 2026.</strong>',
      label_name: 'Ime i prezime',
      legend_attending: 'Dolazite li?',
      radio_yes: 'Da, sa radošću!',
      radio_no: 'Nažalost ne',
      label_guests: 'Broj gostiju koji dolaze',
      option_onlyme: 'Samo ja',
      label_guestnames: 'Imena pratnje (opcijonalno)',
      label_message: 'Poruka (opcijonalno)',
      btn_submit: 'Pošalji potvrdu',
      footer_text: 'Napravljeno sa ljubavlju',
      footer_top: 'nazad na vrh',
      player_play: 'Pusti',
      player_pause: 'Pauziraj',
      player_progress: 'Napredak',
      rsvp_days_left: function (n) {
        return 'Još ' + n + ' ' + (n === 1 ? 'dan' : 'dana') + ' do roka za potvrdu.';
      },
      rsvp_expired: 'Rok za prijavu je istekao.',
      form_thanks: 'Hvala! Vaša potvrda je zabeležena.',
      form_sending: 'Slanje…',
      gallery_uploading: 'Otpremanje…',
      gallery_thanks: 'Hvala na deljenju!',
      gallery_upload_failed: 'Otpremanje nije uspelo. Pokušajte ponovo.',
      err_no_files: 'Nijedan fajl nije primljen.',
      err_not_configured: 'Google Drive još nije podešen.',
      err_upload_failed: 'Otpremanje nije uspelo.',
      err_only_images: 'Dozvoljene su samo slike.',
      err_invalid_input: 'Molimo popunite obavezna polja.',
      err_rsvp_failed: 'Slanje nije uspelo. Pokušajte ponovo.',
    },
    de: {
      page_title: 'Peki wird 30 — Geburtstagsfeier',
      page_description: 'Einladung zum 30. Geburtstag — feiert mit!',
      envelope_hint: 'Zum Öffnen tippen',
      turns30: 'wird 30',
      date_text: '07. November 2026 · 18:00 Uhr',
      dresscode: 'Dresscode: 90er-Jahre',
      cta_rsvp: 'Jetzt zusagen',
      nav_message: 'Für euch',
      nav_details: 'Dresscode',
      nav_gallery: 'Momente',
      nav_rsvp: 'Zusage',
      quote1: 'Man sagt, die schönsten Momente sind die, die man mit den Menschen teilt, die man liebt.',
      quote2: 'Deshalb möchte ich meinen 30. Geburtstag zu einem Abend machen, an den wir uns alle für immer erinnern.',
      quote3: 'Kommt und feiert mit mir — ich freue mich auf euch!',
      location_heading: 'Die Feier',
      map_link: 'Auf der Karte ansehen ↗',
      venue_time: 'Beginn 18:00 Uhr',
      ablauf_heading: 'Dresscode-Inspiration',
      countdown_heading: 'Wir zählen gemeinsam',
      label_days: 'Tage',
      label_hours: 'Stunden',
      label_minutes: 'Minuten',
      label_seconds: 'Sekunden',
      music_heading: 'Mein Soundtrack',
      gallery_intro: 'Teilt eure schönsten Momente vom Fest mit mir!',
      btn_upload: 'Fotos hinzufügen',
      btn_gallery: 'Galerie ansehen',
      rsvp_heading: 'Bestätigt eure Teilnahme',
      rsvp_intro: 'Bitte bestätigt eure Teilnahme spätestens bis zum <strong>18. Oktober 2026</strong>.',
      label_name: 'Name und Nachname',
      legend_attending: 'Kommt ihr?',
      radio_yes: 'Ja, mit Freude!',
      radio_no: 'Leider nicht',
      label_guests: 'Anzahl Gäste, die mitkommen',
      option_onlyme: 'Nur ich',
      label_guestnames: 'Namen der Begleitung (optional)',
      label_message: 'Nachricht (optional)',
      btn_submit: 'Zusage senden',
      footer_text: 'Mit Liebe gemacht',
      footer_top: 'nach oben',
      player_play: 'Abspielen',
      player_pause: 'Pause',
      player_progress: 'Fortschritt',
      rsvp_days_left: function (n) {
        return 'Noch ' + n + ' Tag' + (n === 1 ? '' : 'e') + ' Zeit für eure Zusage.';
      },
      rsvp_expired: 'Die Anmeldefrist ist abgelaufen.',
      form_thanks: 'Danke! Eure Rückmeldung wurde erfasst.',
      form_sending: 'Wird gesendet…',
      gallery_uploading: 'Lädt hoch …',
      gallery_thanks: 'Danke fürs Teilen!',
      gallery_upload_failed: 'Upload fehlgeschlagen. Bitte erneut versuchen.',
      err_no_files: 'Keine Dateien empfangen.',
      err_not_configured: 'Google Drive ist noch nicht konfiguriert.',
      err_upload_failed: 'Upload fehlgeschlagen.',
      err_only_images: 'Nur Bilddateien sind erlaubt.',
      err_invalid_input: 'Bitte füllt die Pflichtfelder aus.',
      err_rsvp_failed: 'Senden fehlgeschlagen. Bitte erneut versuchen.',
    },
    en: {
      page_title: 'Peki Turns 30 — Birthday Party',
      page_description: 'Invitation to a 30th birthday celebration — join the party!',
      envelope_hint: 'Tap to open',
      turns30: 'turns 30',
      date_text: 'November 7, 2026 · 6:00 PM',
      dresscode: 'Dress code: 90s theme',
      cta_rsvp: 'RSVP now',
      nav_message: 'For you',
      nav_details: 'Dress Code',
      nav_gallery: 'Moments',
      nav_rsvp: 'Confirm',
      quote1: 'They say the best moments are the ones we share with the people we love.',
      quote2: 'That’s why I want to turn my 30th birthday into an evening we’ll all remember forever.',
      quote3: 'Come celebrate with me — I can’t wait to see you!',
      location_heading: 'The Celebration',
      map_link: 'View on map ↗',
      venue_time: 'Starts at 6:00 PM',
      ablauf_heading: 'Dress Code Inspiration',
      countdown_heading: 'Counting down together',
      label_days: 'Days',
      label_hours: 'Hours',
      label_minutes: 'Minutes',
      label_seconds: 'Seconds',
      music_heading: 'My Soundtrack',
      gallery_intro: 'Share your favorite moments from the celebration with me!',
      btn_upload: 'Add photos',
      btn_gallery: 'View gallery',
      rsvp_heading: 'Confirm your attendance',
      rsvp_intro: 'Please confirm your attendance by <strong>October 18, 2026</strong> at the latest.',
      label_name: 'Full name',
      legend_attending: 'Will you attend?',
      radio_yes: 'Yes, with joy!',
      radio_no: 'Unfortunately not',
      label_guests: 'Number of guests joining',
      option_onlyme: 'Just me',
      label_guestnames: 'Names of guests (optional)',
      label_message: 'Message (optional)',
      btn_submit: 'Send RSVP',
      footer_text: 'Made with love',
      footer_top: 'back to top',
      player_play: 'Play',
      player_pause: 'Pause',
      player_progress: 'Progress',
      rsvp_days_left: function (n) {
        return n + ' day' + (n === 1 ? '' : 's') + ' left to RSVP.';
      },
      rsvp_expired: 'The RSVP deadline has passed.',
      form_thanks: 'Thank you! Your response has been recorded.',
      form_sending: 'Sending…',
      gallery_uploading: 'Uploading…',
      gallery_thanks: 'Thanks for sharing!',
      gallery_upload_failed: 'Upload failed. Please try again.',
      err_no_files: 'No files received.',
      err_not_configured: 'Google Drive is not configured yet.',
      err_upload_failed: 'Upload failed.',
      err_only_images: 'Only image files are allowed.',
      err_invalid_input: 'Please fill in the required fields.',
      err_rsvp_failed: 'Failed to send. Please try again.',
    },
  };

  function getStoredLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function applyLanguage(lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    if (dict.page_title) document.title = dict.page_title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.page_description) metaDesc.setAttribute('content', dict.page_description);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    var seekEl = document.getElementById('player-seek');
    if (seekEl) seekEl.setAttribute('aria-label', dict.player_progress || '');
    var playBtnEl = document.getElementById('player-play');
    if (playBtnEl && playBtnEl.textContent.trim() !== '⏸') {
      playBtnEl.setAttribute('aria-label', dict.player_play || '');
    }

    window.i18n.lang = lang;
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  window.i18n = {
    lang: DEFAULT_LANG,
    t: function (key) {
      var dict = translations[window.i18n.lang] || translations[DEFAULT_LANG];
      return dict[key] || translations[DEFAULT_LANG][key] || '';
    },
    setLang: function (lang) {
      storeLang(lang);
      applyLanguage(lang);
    },
  };

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.i18n.setLang(btn.dataset.lang);
    });
  });

  var initialLang = getStoredLang() || DEFAULT_LANG;
  if (!translations[initialLang]) initialLang = DEFAULT_LANG;
  applyLanguage(initialLang);
})();
