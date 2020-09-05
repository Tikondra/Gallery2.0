import {GalleryOptions} from "./constants";

const gallery = document.querySelector('.gallery__list');

export const getImg = (image) => {
  const galleryImg = document.createElement('img');
  const ratio = image.width / image.height;
  const widthBase = ratio * GalleryOptions.BASE_HEIGHT;

  galleryImg.classList.add('gallery__img');
  galleryImg.src = image.url;
  galleryImg.width = widthBase;
  galleryImg.height = GalleryOptions.BASE_HEIGHT;
  galleryImg.style.flexGrow = ratio;
  return galleryImg;
};

export const renderImages = (data) => {
  const fragment = document.createDocumentFragment();
  data.galleryImages.forEach((img) => fragment.append(getImg(img)));
  gallery.prepend(fragment);
};

export const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function() {
    const img = document.createElement('img');
    img.src = reader.result;

    img.onload = function() {
      const image = getImg({
        url: reader.result,
        width: this.width,
        height: this.height
      });

      gallery.prepend(image)
    };
  }
};
