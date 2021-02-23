const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
let isInitialLoad = true;
let initialCount = 5;
const apiKey = 'BRbp9nhxCAI4TeJlPWEDTUQN5qsOuKHL7T6glpY7FJY';

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded () {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
       
    
    }

}

function setAttributes(element, attributes) {
for (const key in attributes) {
    element.setAttribute(key, attributes[key])
}
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
   
    photosArray.forEach((photo) => {
      const item = document.createElement('a');
  
  setAttributes(item, {
   href: photo.links.html,
   target: '_blank',
});
      const img = document.createElement('img');
   
   setAttributes(img, {
       src: photo.urls.regular,
       alt: photo.alt_description,
       title: photo.alt_description,

   });

   img.addEventListener('load', imageLoaded)

      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  
}

async function getPhotos() {

     try {
         const response = await fetch(apiUrl);
         photosArray = await response.json();
         displayPhotos();
         if (isInitialLoad) {
             updateAPIURLWithNewCount(30)
             isInitialLoad = false
         }

     } catch(err) {
          
     }

}

window.addEventListener('scroll', () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
}
  getPhotos();
}) 

getPhotos();