const stage = document.getElementById('stage');
const emptyState = document.getElementById('empty-state');
const photos = window.photoValentin.getPhotos();

let lastIndex = -1;

function showNextPhoto() {
  if (photos.length === 0) return;

  let nextIndex = Math.floor(Math.random() * photos.length);
  if (photos.length > 1) {
    while (nextIndex === lastIndex) {
      nextIndex = Math.floor(Math.random() * photos.length);
    }
  }

  const nextPhoto = document.createElement('img');
  nextPhoto.className = 'photo';
  nextPhoto.src = photos[nextIndex];
  nextPhoto.alt = '';

  stage.append(nextPhoto);
  lastIndex = nextIndex;
  setTimeout(() => nextPhoto.remove(), 500);
}

if (photos.length === 0) {
  emptyState.hidden = false;
} else {
  setTimeout(showNextPhoto, 0);
  setInterval(showNextPhoto, 5000);
}

