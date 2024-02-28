let emptyObj = {};
let listOfBreeds = [""];
let options = ""; //for creating a list of options for breed names
const favDogs = { "": "" };

let right = document.getElementById("btnRight");
let left = document.getElementById("btnLeft");
let pageTitle = document.getElementById("name");
let dropdownLabel = document.getElementById("labelBreed");
let linkToFav = document.getElementById("favLink");
let goBackLink = document.getElementById("goBack");
let descrip = document.getElementById("intro");
let imageCarousel = document.getElementById("imageCarousel");
let favButtonStar = document.getElementById("fav");
let image = document.getElementById("slide");
let breedDropdown = document.getElementById("arrayDropdown");

//api fetching the list of all dog breeds.
fetch("https://dog.ceo/api/breeds/list/all")
  .then((res) => res.json())
  .then(
    (emptyObj) => {
      for (let key in emptyObj.message) {
        let breed = key.charAt(0).toUpperCase() + key.slice(1);
        listOfBreeds.push(breed);
      }
      listOfBreeds.map((op, i) => {
        options = options + `<option value="${op}" id="${i}">${op}</options>`;
      });

      breedDropdown.innerHTML = options;

      bringAllDogPictures();

      descrip.textContent = `Please choose a breed of your choice to enjoy cute doggie images.`;
    },
    (error) => {
      console.log(error);
    }
  );

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
      .then(
        (dogImages) => {
          listOfBreeds[i] =
            listOfBreeds[i].charAt(0).toUpperCase() + listOfBreeds[i].slice(1);
          allImages[listOfBreeds[i]] = dogImages.message;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

//what will happen when the breed is chosen

var selectedBreed;

function handleBreedSelect(event) {
  selectedBreed = event.target.value;
  checkFav();

  if (selectedBreed !== "") {
    imageCarousel.style.visibility = "visible";
    descrip.textContent = ``;
    setImage();
    favButtonStar.style.visibility = "visible";
  } else {
    descrip.textContent = `Please choose a breed of your choice to enjoy cute doggie images.`;
    imageCarousel.style.visibility = "hidden";
    favButtonStar.style.visibility = "hidden";
  }
}

function checkFav() {
  if (favDogs[selectedBreed]) {
    favButtonStar.style.color = "#fbe309";
  } else {
    favButtonStar.style.color = "#c1b4dd";
  }
}

function setImage() {
  let breedType = selectedBreed;
  image.src = allImages[breedType][0];
  left.disabled = true;
}

function addToFav() {
  favButtonStar.style.color = "#fbe309";
  if (favDogs[selectedBreed] === undefined) {
    favDogs[selectedBreed] = allImages[selectedBreed];
  }
}

function handleFavLinkClick() {
  let favElement = "";
  pageTitle.textContent = "List of all your favourite pups:";
  dropdownLabel.textContent = "Favourite Breeds:";
  linkToFav.textContent = "";
  goBackLink.style.visibility = "visible";
  descrip.textContent = "";
  imageCarousel.style.visibility = "hidden";
  favButtonStar.style.visibility = "hidden";

  for (let key in favDogs) {
    favElement = favElement + `<option value="${key}">${key}</options>`;
  }

  breedDropdown.innerHTML = favElement;
}

function handleGoHomePage() {
  pageTitle.textContent = "Pawfect Pics 🐶";
  dropdownLabel.textContent = "Breed:";
  linkToFav.textContent = "Your favourite pups!";
  goBackLink.style.visibility = "hidden";
  descrip.textContent = `Please choose a breed of your choice to enjoy cute doggie images.`;
  imageCarousel.style.visibility = "hidden";
  favButtonStar.style.visibility = "hidden";

  for (let key in allImages) {
    let i = 0;
    options = options + `<option value="${key}" id="${i}">${key}</options>`;
    i++;
  }

  breedDropdown.innerHTML = options;
}

function nextImage() {
  let imageUrl = image.src;
  let index = allImages[selectedBreed].indexOf(imageUrl);
  if (index === 0) {
    left.disabled = false;
  }

  if (index < allImages[selectedBreed].length - 1) {
    let nextIndex = index + 1;
    image.src = allImages[selectedBreed][nextIndex];
    if (nextIndex === allImages[selectedBreed].length - 1) {
      right.disabled = true;
    }
  }
}

function previousImage() {
  let imageUrl = image.src;
  let index = allImages[selectedBreed].indexOf(imageUrl);
  if (index === allImages[selectedBreed].length - 1) {
    right.disabled = false;
  }
  if (index > 0) {
    image.src = allImages[selectedBreed][index - 1];
    if (index === 1) {
      left.disabled = true;
    }
  }
}

//Add Event listener when breed is chosen from dropdown:
breedDropdown.addEventListener("change", handleBreedSelect);

//Add Event Listener when breed is marked favourite:
favButtonStar.addEventListener("click", addToFav);

// Add Event listener when Your Favourites link button is clicked
linkToFav.addEventListener("click", handleFavLinkClick);

// Add Event listener when Go Back to home page button is clicked
goBackLink.addEventListener("click", handleGoHomePage);

//Right button is clicked for image
right.addEventListener("click", nextImage);

//Left button is clicked for image
left.addEventListener("click", previousImage);
