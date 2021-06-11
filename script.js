const searchForm = document.querySelector("form");
const search = document.querySelector("#movie-search");
const btnForm = document.querySelector(".btn-movies");
// const moviesInput = document.querySelector("#gif");
const gallery = document.querySelector(".gallery");
const searchGallery = document.querySelector(".search-gallery");
const moreResults = document.querySelector(".btn-movies");
const movieContents = document.querySelector(".movie-contents");
const returnButton = document.querySelector(".btn-return");
/* Get the key outta here during commits */
const apiKey = "8ae472f9540ff81c2afe402c3afea0bb";
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

searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // search.addEventListener("search", (evt) => {
    const value = search.value.trim();
    if (value == '')
        hasInput = false;
    else hasInput = true;
    if (hasInput) {
        // We have input, so show the search results
        searchGallery.innerHTML = "";
        searchGallery.classList.remove("hidden");
        gallery.classList.add("hidden");
        moreResults.classList.add("hidden");
        handleSearch(evt);
    } else {
        // Show the top movies instead
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
//    
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
        gallery.innerHTML += generateHTML(el, el.id);

    });
}

function displaySearchResults(data) {
    data.forEach(el => {
        searchGallery.innerHTML += generateHTML(el, el.id);

    });
}
window.onload = async function() {
    // run your function here to make it execute as soon as the page loads
    moreResults.classList.remove("hidden");
    gallery.classList.remove("hidden");
    gallery.innerHTML = "";
    pages += 1;
    movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`
    data = await getResponse(movieUrl);
    console.log(data);
    displayResults(data);

}

async function getResponse(movieUrl) {
    // This is the function you need to make external api calls.
    // If the data is wrapped around something, you need to extract the data further.
    response = await fetch(movieUrl);
    jsonResponse = await response.json();
    data = jsonResponse.results;
    return data;
}

function displayMovie(el) {
    console.log(el);
    // movieContents.classList.remove(hidden);
    // movieContents.innerHTML +=
    //     `<form><button class="btn-return">Close</button></form>
    //     <div></div>`
}

function generateHTML(el, id) {
    return ` <div class = "movie-item popup" onclick = "displayMovie(${id})">
        <img src = "https://image.tmdb.org/t/p/w500/${el.poster_path}" alt = "Gif of ${el.original_title}" class = "movie-img">
        <div> <span><p>⭐&nbsp;${el.vote_average} </p></span> <p class = "movie-title" >${el.title} </p> </div>
        </div>`
}
// What you need to do