var emptyObj = {};
var listOfBreeds = [""];
var options = ""; //for creating a list of options for breed names
const favDogs = {};
let right = document.getElementById("btnRight");
let left = document.getElementById("btnLeft");

//api fetching the list of all dog breeds.
fetch("https://dog.ceo/api/breeds/list/all")
  .then((res) => res.json())
  .then((data) => (emptyObj = data.message))
  .then((emptyObj) => {
    for (let key in emptyObj) {
      let breed = key.charAt(0).toUpperCase() + key.slice(1);
      listOfBreeds.push(breed);
    }
    listOfBreeds.map((op, i) => {
      options = options + `<option value="${op}" id="${i}">${op}</options>`;
    });

    document.getElementById("arrayDropdown").innerHTML = options;

    bringAllDogPictures();

    document.querySelector(
      "#intro"
    ).textContent = `Please choose a breed of your choice to enjoy cute doggie images.`;
  });

//api fetching all the images of dog for each breed in an object of arrays.

let allImages = {};

function bringAllDogPictures() {
  for (let i = 1; i < listOfBreeds.length; i++) {
    listOfBreeds[i] =
      listOfBreeds[i].charAt(0).toLowerCase() + listOfBreeds[i].slice(1);
    let url = `https://dog.ceo/api/breed/${listOfBreeds[i]}/images`;
    let dogImages = [];
    fetch(url)
      .then((response) => response.json())
      .then((data) => (dogImages = data.message))
      .then((dogImages) => {
        listOfBreeds[i] =
          listOfBreeds[i].charAt(0).toUpperCase() + listOfBreeds[i].slice(1);
        allImages[listOfBreeds[i]] = dogImages;
      });
  }
}

//what will happen when the breed is chosen

const selectElement = document.querySelector("#arrayDropdown");
var selectedBreed;

function handleBreedSelect(event) {
  selectedBreed = event.target.value;
  checkFav();

  if (selectedBreed !== "") {
    document.getElementById("imageCarousel").style.visibility = "visible";
    document.querySelector("#intro").textContent = ``;
    setImage();
    document.getElementById("fav").style.visibility = "visible";
  } else {
    document.querySelector(
      "#intro"
    ).textContent = `Please choose a breed of your choice to enjoy cute doggie images.`;
    document.getElementById("imageCarousel").style.visibility = "hidden";
    document.getElementById("fav").style.visibility = "hidden";
  }
}

function checkFav() {
  if (favDogs[selectedBreed]) {
    document.getElementById("fav").style.color = "#fbe309";
  } else {
    document.getElementById("fav").style.color = "#c1b4dd";
  }
}
function setImage() {
  let breedType = selectedBreed;
  document.getElementById("slide").src = allImages[breedType][0];
  left.disabled = true;
}

function addToFav() {
  document.getElementById("fav").style.color = "#fbe309";
  favDogs[selectedBreed] = allImages[selectedBreed];
  console.log(favDogs)
}

let favElement = "";

function handleFavLinkClick() {
  document.getElementById('name').textContent='List of all your favourite pups:';
  document.getElementById('labelBreed').textContent='Favourite Breeds'
  document.getElementById('favLink').textContent = ''
  document.getElementById('goBack').style.visibility='visible'
  document.getElementById('intro').textContent= ''

  for (let key in favDogs) {
   favElement = favElement + `<option value="${key}">${key}</options>`
  }

  document.getElementById('arrayDropdown').innerHTML = favElement;
  document.getElementById('fav').style.visibility = 'hidden';
}

//Add Event listener when breed is chosen from dropdown:
selectElement.addEventListener("change", handleBreedSelect);

//Add Event Listener when breed is marked favourite:
document.getElementById("fav").addEventListener("click", addToFav);

document
  .getElementById("favLink")
  .addEventListener("click", handleFavLinkClick);

// document.getElementById('goBack').addEventListener('click', )

function nextImage() {
  let imageUrl = document.getElementById("slide").src;
  let index = allImages[selectedBreed].indexOf(imageUrl);
  if (index === 0) {
    left.disabled = false;
  }

  if (index < allImages[selectedBreed].length - 1) {
    let nextIndex = index + 1;
    document.getElementById("slide").src = allImages[selectedBreed][nextIndex];
    if (nextIndex === allImages[selectedBreed].length - 1) {
      right.disabled = true;
    }
  }
}

function previousImage() {
  let imageUrl = document.getElementById("slide").src;
  let index = allImages[selectedBreed].indexOf(imageUrl);
  if (index === allImages[selectedBreed].length - 1) {
    right.disabled = false;
  }
  if (index > 0) {
    document.getElementById("slide").src = allImages[selectedBreed][index - 1];
    if (index === 1) {
      left.disabled = true;
    }
  }
}

right.addEventListener("click", nextImage);
left.addEventListener("click", previousImage);
