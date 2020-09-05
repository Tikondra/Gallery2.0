import {previewFile, renderImages} from "./render";
import {GalleryOptions} from "./constants";

const fileChooser = document.querySelector('input[type=file]');
const fileLoad = document.querySelector('input[type=url]');
const form = document.querySelector('form');
/** загрузка через файл */
export const onLoadFile = (evt, file = fileChooser.files[0]) => {
  if (file.type === GalleryOptions.TYPE_JSON) {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      let gallery = (JSON.parse(reader.result));
      renderImages(gallery);
      form.reset();
    });
    reader.readAsText(file);
  } else {
    previewFile(file)
  }
};

/** загрузка черенз url */
export const onLoadUrl = (evt) => {
  evt.preventDefault();

  if (fileLoad.value) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        renderImages(xhr.response);
        form.reset();
      } else {

      }
    });
    xhr.open('GET', fileLoad.value);
    xhr.send();
  }
};
