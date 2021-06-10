const searchForm = document.querySelector("form");
const search = document.querySelector("#movie-search");
const btnForm = document.querySelector(".btn-movies");
// const moviesInput = document.querySelector("#gif");
const gallery = document.querySelector(".gallery");
const searchGallery = document.querySelector(".search-gallery");
const moreResults = document.querySelector(".btn-movies");

const limit = 9;
const rating = "g";
var pages = 0;
var offset = 0;
var query = "";
var movieUrl = "";
var response = "";
var jsonResponse = "";
var data = "";
var hasInput;
// search input change
// function search(evt) {
//     evt.preventDefault();
// }
searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // search.addEventListener("search", (evt) => {
    const value = search.value.trim();
    console.log(value);
    if (value == '')
        hasInput = false;
    else hasInput = true;
    if (hasInput) {
        searchGallery.innerHTML = "";
        searchGallery.classList.remove("hidden");
        gallery.classList.add("hidden");
        moreResults.classList.add("hidden");
        handleSearch(evt);
    } else {
        searchGallery.classList.add("hidden");
        gallery.classList.remove("hidden");
        moreResults.classList.remove("hidden");
        //window.onload();
    }
});
// });

moreResults.addEventListener("click", (evt) => {
    showMore(evt);
});

async function handleSearch(evt) {
    query = search.value.trim();
    var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    data = await getResponse(searchUrl);
    displaySearchResults(data);
}

// async function handleFormSubmit(evt) {
//     query = evt.target.gif.value;
//     // const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + input + "&page=1&include_adult=false"
//     //`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;
//     movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`
//         //pages += 1;
//     response = await fetch(movieUrl);
//     jsonResponse = await response.json();
//     data = jsonResponse.data;
//     console.log(data);
//     // Extract data using data[0].images.original.url
//     displayResults(data);
//     evt.target.gif.value = "";

// }
async function showMore(evt) {
    evt.preventDefault();
    pages += 1;
    //offset = pages * limit;
    //movieUrl = `https: api.themoviedb.org / 3 / movie / 550 ? api_key = $ { apiKey }`;
    movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`;
    //console.log(movieUrl);
    data = await getResponse(movieUrl);
    displayResults(data);

}

// function getResults(evt) {
//     evt.preventDefault();
//     gifResults.innerHTML = "";
//     handleFormSubmit(evt);
// }

function displayResults(data) {
    data.forEach(el => {
        gallery.innerHTML += ` <div class="movie-item">
                <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}" alt="Gif of ${el.original_title}" class="movie-img">
                <p class="movie-title">${el.title}</p>
                </div>`

    });
}

function displaySearchResults(data) {
    data.forEach(el => {
        searchGallery.innerHTML += ` <div class="movie-item">
                <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}" alt="Gif of ${el.original_title}" class="movie-img">
                <p class="movie-title">${el.title}</p>
                </div>`

    });
}
window.onload = async function() {
    // run your function here to make it execute as soon as the page loads
    moreResults.classList.remove("hidden");
    gallery.classList.remove("hidden");
    gallery.innerHTML = "";
    pages += 1;
    movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`
        //console.log(pages);
    data = await getResponse(movieUrl);
    console.log(data);
    displayResults(data);

}

async function getResponse(movieUrl) {
    response = await fetch(movieUrl);
    jsonResponse = await response.json();
    data = jsonResponse.results;
    return data;
}

// What you need to do
// Work on searching, maybe have the div be hidden and another div for searching be active
// Grid view using css grid
// We need title, poster image, a votes thing, and a star for the votes
// Font sizing
// Responsive to at least two different screen sizes
// Responsive to at least two different screen sizes