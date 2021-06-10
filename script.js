const searchForm = document.querySelector("form");
const btnForm = document.querySelector(".btn-movies");
const moviesInput = document.querySelector("#gif");
const gallery = document.querySelector(".gallery");
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

// searchForm.addEventListener("submit", (evt) => {
//     moreResults.classList.remove("hidden");
//     getResults(evt);
// });
moreResults.addEventListener("click", (evt) => {
    showMore(evt);
});




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
        gallery.innerHTML += ` <div>
                <img src = "https://image.tmdb.org/t/p/original/${el.backdrop_path}" alt = "Gif of ${el.backdrop_path}" >
                </div>`

    });
}
window.onload = async function() {
    // run your function here to make it execute as soon as the page loads
    gallery.innerHTML = "";
    pages += 1;
    movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`
    console.log(pages);
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