import './styles/main.scss';
import {preventDefaults} from "./utils";
import {onLoadFile, onLoadUrl} from "./load";
import {previewFile} from "./render";
import {GalleryOptions} from "./constants";

const dropArea = document.querySelector('.gallery__drop-area');
const fileLoader = dropArea.querySelector('.form__input--file');
const fileLoad = document.querySelector('.form__input--url');
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery__list');

const highlight = () => dropArea.classList.add('gallery__drop-area--highlight');
const unHighlight = () => dropArea.classList.remove('gallery__drop-area--highlight');

const handleDrop = (e) => {
  const dt = e.dataTransfer;
  const file = dt.files[0];
  file.type === GalleryOptions.TYPE_JSON ? onLoadFile({}, file, true) : previewFile(file);
};

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unHighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);
fileLoader.addEventListener('change', onLoadFile, false);
form.addEventListener('submit', onLoadUrl);
gallery.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'IMG') {
    evt.target.remove();
  }
});
