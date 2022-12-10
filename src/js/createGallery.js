import { fetchImages, limit } from './fetchImages';
import { textInput, lightbox, ref, checkUP } from '../index';
import Notiflix from 'notiflix';

let page = 1;

function onCreatList() {
  // console.log(checkUP);
  if (checkUP === true) {
    page = 1;
  }

  fetchImages(textInput)
    .then(r => {
      renderList(r);
      page = page + 1;
      if (r.totalHits <= page * limit) {
        if (r.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          ref.loadMore.classList.add(`hidden`);
          Notiflix.Notify.info(
            `We're sorry, but you've reached the end of search results.`
          );
        }
      }
    })
    .catch(Error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

function renderList(element) {
  if (element.totalHits === 0) {
    return;
  }
  const markup = element.hits
    .map(n => {
      return `<li class="gallary-item">
      <a href="${n.largeImageURL}" class="gallary-link"
          ><img src="${n.previewURL}" alt="${n.tags}" class="gallary-image" loading="lazy"/>
            <div class="info">
      <p class="info-item">
        &#10084 <span>${n.likes}</span>
      </p>
      <p class="info-item">
        &#128064 <span>${n.views}</span>
      </p>
      <p class="info-item">
        &#128172 <span>${n.comments}</span>
      </p>
      <p class="info-item">
        &#11147 <span>${n.downloads}</span>
      </p>
    </div>
      </a>
  </li>`;
    })
    .join(``);

  ref.gallery.insertAdjacentHTML(`beforeend`, markup);

  nonClick();
  lightbox.refresh();
  ref.loadMore.classList.remove(`hidden`);
}

function nonClick() {
  let links = document.querySelectorAll('.gallary-link');
  links.forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });
}

export { page, onCreatList };
