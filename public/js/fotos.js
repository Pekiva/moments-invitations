(function () {
  var galleryStatus = document.getElementById('gallery-status');
  var photoUpload = document.getElementById('photo-upload');
  var galleryLink = document.getElementById('gallery-link');

  fetch('/api/gallery-link')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.url) galleryLink.href = data.url;
    })
    .catch(function () {});

  photoUpload.addEventListener('change', function () {
    var files = photoUpload.files;
    if (!files || files.length === 0) return;

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    galleryStatus.textContent = window.i18n.t('gallery_uploading');

    fetch('/api/photos', { method: 'POST', body: formData })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) {
          galleryStatus.textContent = window.i18n.t('err_' + data.code) || data.error;
          return;
        }
        galleryStatus.textContent = window.i18n.t('gallery_thanks');
        photoUpload.value = '';
      })
      .catch(function () {
        galleryStatus.textContent = window.i18n.t('gallery_upload_failed');
      });
  });
})();
