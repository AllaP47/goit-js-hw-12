import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery } from "./js/render-functions.js";
import iziToast from "izitoast/dist/js/iziToast.min.js";
import "izitoast/dist/css/iziToast.min.css";

let query = "";
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;
const MAX_IMAGES = 100;
let totalLoaded = 0;

const form = document.querySelector(".form");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

loadMoreBtn.style.display = "none";

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.elements["search-text"].value.trim();
  if (!query) return;

  page = 1;
  totalLoaded = 0;
  showLoader();
  loadMoreBtn.style.display = "none";

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    renderGallery(data.hits);
    totalLoaded += data.hits.length;
    event.target.reset();

    if (data.hits.length > 0 && totalLoaded < Math.min(MAX_IMAGES, totalHits)) {
      loadMoreBtn.style.display = "block";
    }
  } catch {
    iziToast.error({ title: "Error", message: "Failed to fetch images" });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  if (totalLoaded >= Math.min(MAX_IMAGES, totalHits)) return;
  page += 1;
  
  showLoader();
  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits, true);
    totalLoaded += data.hits.length;

    if (totalLoaded >= Math.min(MAX_IMAGES, totalHits)) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    smoothScroll();
  } catch {
    iziToast.error({ title: "Error", message: "Failed to load more images" });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const galleryItem = document.querySelector(".gallery-item");
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: "smooth" });
  }
}



