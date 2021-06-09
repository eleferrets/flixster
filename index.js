const gifForm = document.querySelector("form");
const btnForm = document.querySelector("form");
const gifInput = document.querySelector("#gif");
const gifResults = document.querySelector(".gif-results");
const moreResults = document.querySelector("#more-btn");

const limit = 9;
const rating = "g";
var pages = 0;
var offset = 0;
var query = "";
var gifUrl = "";
var response = "";
var jsonResponse = "";
var data = "";

gifForm.addEventListener("submit", (evt) => {
    moreResults.classList.remove("hidden");
    getResults(evt);
});
moreResults.addEventListener("click", (evt) => {
    showMore(evt);
});




async function handleFormSubmit(evt) {
    query = evt.target.gif.value;
    gifUrl = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&rating=${rating}&offset=${offset}`;
    //pages += 1;
    response = await fetch(gifUrl);
    jsonResponse = await response.json();
    data = jsonResponse.data;
    // Extract data using data[0].images.original.url
    displayResults(data);
    evt.target.gif.value = "";

}
async function showMore(evt) {
    evt.preventDefault();
    pages += 1;
    offset = pages * limit;
    gifUrl = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&rating=${rating}&offset=${offset}`;
    console.log(gifUrl);
    response = await fetch(gifUrl);
    jsonResponse = await response.json();
    data = jsonResponse.data;
    displayResults(data);

}

function getResults(evt) {
    evt.preventDefault();
    gifResults.innerHTML = "";
    handleFormSubmit(evt);
}

function displayResults(data) {
    data.forEach(el => {
        gifResults.innerHTML += `
    <div>
    <img src="${el.images.original.url}" alt="Gif of ${el.images.original.url}">
    </div>`
    });

}