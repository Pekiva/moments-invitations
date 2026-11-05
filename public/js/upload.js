(function () {
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

  if (!photoUpload) return;

  function setStatus(text) {
    if (galleryStatus) galleryStatus.textContent = text;
  }

  photoUpload.addEventListener('change', function () {
    var files = photoUpload.files;
    if (!files || files.length === 0) return;

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/photos');

    xhr.upload.onprogress = function (event) {
      if (!event.lengthComputable) return;
      var percent = Math.min(100, Math.round((event.loaded / event.total) * 100));
      setStatus(window.i18n.t('gallery_uploading') + ' ' + percent + '%');
    };

    xhr.onload = function () {
      var data = {};
      try { data = JSON.parse(xhr.responseText); } catch (e) {}
      if (xhr.status < 200 || xhr.status >= 300) {
        setStatus((data.code && window.i18n.t('err_' + data.code)) || window.i18n.t('gallery_upload_failed'));
        return;
      }
      setStatus(window.i18n.t('gallery_thanks'));
      photoUpload.value = '';
    };

    xhr.onerror = function () {
      setStatus(window.i18n.t('gallery_upload_failed'));
    };

    setStatus(window.i18n.t('gallery_uploading') + ' 0%');
    xhr.send(formData);
  });
})();
