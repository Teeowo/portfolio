// Share buttons: native share sheet on touch devices, copy-link everywhere else.
document.querySelectorAll('.share').forEach(function (box) {
  var btn = box.querySelector('.share-btn');
  var status = box.querySelector('.share-status');
  var label = btn.querySelector('.share-label');
  var url = box.dataset.url, title = box.dataset.title, timer;

  function say(msg) {
    status.textContent = msg; label.textContent = 'Copied';
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ''; label.textContent = 'Share'; }, 2000);
  }
  function copy() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () { say('Link copied'); },
        function () { prompt('Copy this link:', url); });
    } else { prompt('Copy this link:', url); }
  }
  btn.addEventListener('click', function () {
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      // Cancelling the share sheet is fine; a real failure falls back to copying.
      navigator.share({ title: title, url: url }).catch(function (err) {
        if (err.name !== 'AbortError') copy();
      });
    } else { copy(); }
  });
});
