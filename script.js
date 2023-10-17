const searchButton = document.getElementById('searchButton');
const categoryInput = document.getElementById('categoryInput');
const gallery = document.getElementById('gallery');
const showmore = document.getElementById("showmore");


let page=1;
let currentCategory='';

searchButton.addEventListener('click', () => {
  const category = categoryInput.value.trim();
  if (category !== '') {
    page=1;
    currentCategory=category;
    fetchImages(currentCategory,page);
  }
});

showmore.addEventListener("click",() => {
  if (currentCategory) {
    page++; // Increment the page to load more results
    fetchImages(currentCategory, page);
  }
});

async function fetchImages(category,page) { 
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=FvCQL7d_zU-fOg5NvhuHiJ_OHYZxEYSkXKv2L18HCuk&per_page=12&page=${page}`, {
    headers: {
      Authorization: 'FvCQL7d_zU-fOg5NvhuHiJ_OHYZxEYSkXKv2L18HCuk'
    }
  });
  const data = await response.json();
  displayImages(data.results);
}

function displayImages(images) {

  if (images.length === 0) {
    loadMoreButton.style.display = 'none'; 
  }

  images.forEach(image => {
    const imageElement = document.createElement('div');
    imageElement.classList.add('image-card');
    imageElement.innerHTML = `<img src="${image.urls.small}">
      <div class="image-info">
        <b><p class="author">Author</b>: ${image.user.name}</p>
        <b><p class="description">Description</b>:${image.description ? image.description.slice(0, 20) : "No Desciption"}</p>
        <a class="link" href="${image.links.html}" target="_blank">Read More</a>
      </div>`;
    gallery.appendChild(imageElement);
  });
   showmore.style.display = "block";
}

