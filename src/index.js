import { onCreatList } from './js/createGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let checkUP = false;
let textInput = null;
let lightbox = new SimpleLightbox('.gallary-link');
const ref = {
  loadMore: document.querySelector(`.loadMore`),
  gallery: document.querySelector(`.list`),
  form: document.querySelector(`#search-form`),
};

ref.form.addEventListener(`input`, onSerch);
ref.loadMore.addEventListener(`click`, checkOnCreatList);
ref.form.addEventListener('submit', checkOnCreatList);

function onSerch(e) {
  checkUP = true;
  // console.log(checkUP);

  ref.gallery.innerHTML = ``;
  textInput = e.target.value;
  ref.loadMore.classList.add(`hidden`);
}

function checkOnCreatList(e) {
  e.preventDefault();
  onCreatList();
  checkUP = false;
}

export { checkUP, textInput, lightbox, ref };
