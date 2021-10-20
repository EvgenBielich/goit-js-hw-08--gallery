import gallerys from './app.js';

const imgContainer = document.querySelector('.js-gallery');

const ollGallery = createImgGallery(gallerys);
imgContainer.insertAdjacentHTML('beforeend', ollGallery);

function createImgGallery(gallerys) {
   return gallerys
   .map(gallery => {
      return `
   <li class="gallery__item">
   <a
      class="gallery__link"
      href= "${gallery.original}"
      >
      <img class = "gallery-image"
      src = '${gallery.preview}'
      alt = '${gallery.description}'
      data-source="${gallery.original}"
      width = 392
      height = 240>
      </a>
   </li>
`;
   })
   .join(' ');
};
createImgGallery(gallerys);

const ImageEl = document.querySelector('.gallery-image');

imgContainer.addEventListener('click', onContainerClick);
const modalImgRef = document.querySelector('.lightbox__image');
const modalContainer = document.querySelector('.lightbox');

function onContainerClick(event) {
   event.preventDefault();
   const isGallaryEl = event.target.classList.contains('gallery-image');
   if (!isGallaryEl) {
       return;
   }
   const currentActiveImg = document.querySelector('.lightbox .is-open')
       
   if (currentActiveImg) {
       currentActiveImg.classList.remove('is-open');
   }

   window.addEventListener('keydown', onEscPress);
  modalContainer.classList.add('is-open');
   modalImgRef.src = event.target.dataset.source;
   modalImgRef.alt = event.target.alt;
   
};

const closeButtonEl = document.querySelector('.lightbox__button');
console.log(closeButtonEl);
const closeModalEl = document.querySelector('.lightbox__content');
console.log(closeModalEl);
const closeOverlayEl = document.querySelector('.lightbox__overlay');
console.log(closeOverlayEl);

closeOverlayEl.addEventListener('click', onCloseButton);
closeButtonEl.addEventListener('click', onCloseButton);

function onCloseButton(e) {
   modalContainer.classList.remove('is-open');
   modalImgRef.src = '';
   modalImgRef.alt = '';
   window.removeEventListener('keydown', onEscPress);
   if (modalContainer.classList.contains('is-open')) {
   window.removeEventListener('keydown', onArrowEl);
 };
};

function onEscPress(event) {
   console.log(event.code);
   if (event.code === 'Escape') {
       onCloseButton();
   }
};