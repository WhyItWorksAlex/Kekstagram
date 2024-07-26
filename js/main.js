import {photoDescriptions} from './photo-description.js';
import {getPicturesData} from './api.js';
import {createThumbnails} from './thumbnail.js';
import {initGalleryFilters} from './gallery.js';
import {showUploadErrorMessage} from './utils.js';
import {initModal} from './modal.js';

getPicturesData()
  .then((pictures) => {
    createThumbnails(pictures);
    initGalleryFilters(pictures);
  })
  .catch(() => {
    showUploadErrorMessage();
    createThumbnails(photoDescriptions);
    initGalleryFilters(photoDescriptions);
  });


initModal();
