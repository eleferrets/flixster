const searchForm = document.querySelector("form");
const search = document.querySelector("#movie-search");
const btnForm = document.querySelector(".btn-movies");
const gallery = document.querySelector(".gallery");
const searchGallery = document.querySelector(".search-gallery");
const moreResults = document.querySelector(".btn-movies");
const movieContents = document.querySelector(".movie-contents");
const actualContents = document.querySelector(".actual-contents");
const returnButton = document.querySelector(".btn-return");
/* Get the key outta here during commits */
const apiKey = "8ae472f9540ff81c2afe402c3afea0bb";
const limit = 9;
const rating = "g";
var text = document.getElementById("modal-text");
var pages = 0;
var offset = 0;
var query = "";
var movieUrl = "";
var response = "";
var jsonResponse = "";
var data = "";
var hasInput;
var url = "";

searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
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

    }
});

moreResults.addEventListener("click", (evt) => {
    showMore(evt);
});

async function handleSearch(evt) {
    // Get a search result without whitespace and display the data in the search results
    query = search.value.trim();
    var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    data = await getResponse(searchUrl);
    displaySearchResults(data);
}

// }
async function showMore(evt) {
    // For the button, add the current page and display results
    evt.preventDefault();
    pages += 1;
    movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`;
    data = await getResponse(movieUrl);
    displayResults(data);

}


function displayResults(data) {
    // Pass in each sub object and display them
    data.forEach(el => {
        gallery.innerHTML += generateHTML(el, el.id);

    });
}

function displaySearchResults(data) {
    // Pass in each sub object and display them
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

async function displayMovie(id) {
    movieContents.classList.remove("hidden");

    modal.style.display = "block";
    url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    response = await fetch(url);
    jsonResponse = await response.json();
    let spana = document.getElementsByClassName("close");

    if (spana.length > 0) {
        var jr = jsonResponse;
        var url2 = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        var response2 = await fetch(url2);
        var jsonResponse2 = await response2.json();
        var jr2 = jsonResponse2;
        text.innerHTML = `
        <div>
        <img src="https://image.tmdb.org/t/p/w500/${jr.backdrop_path}" alt="Backdrop of ${jr.original_title}">
        <div> <span><p>⭐&nbsp;${jr.vote_average} </p></span> <p>${jr.genres[0].name} </p><h3>${jr.original_title} </h3><p>${jr.runtime} min | ${jr.release_date}</p><img src="https://image.tmdb.org/t/p/w500/${jr.poster_path}" alt="Poster of ${jr.original_title}"> <p>Overview: ${jr.overview} </p>
        <iframe id="ytplayer" type="text/html" width="320" height="180"
  src="https://www.youtube.com/embed/${jr2.results[0].key}"
  frameborder="0"></iframe> </div>
        </div>`;
    }
}

function generateHTML(el, id) {
    return ` <div class = "movie-item popup" onclick = "displayMovie(${id})">
        <img src = "https://image.tmdb.org/t/p/w500/${el.poster_path}" alt = "Poster of ${el.original_title}" class = "movie-img">
        <div> <span><p>⭐&nbsp;${el.vote_average} </p></span> <p class = "movie-title" >${el.title} </p> </div>
        </div>`
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}