// Get all the breed data all at once
// Get the image data all at once as well so that less requests
//creating an array containing all the images for each specific breed right when the page loads. - done
//create an empty array for list of breeds in dropdown
//use that list and store that in an object and fetch all the images for each breed.

var emptyObj = {};
var listOfBreeds = [""];
var options = ""; //for creating a list of options for breed names

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

console.log(allImages);

//what will happen when the breed is chosen

const selectElement = document.querySelector("#arrayDropdown");
var selectedBreed;

function handleBreedSelect(event) {
  document.querySelector(
    "#test"
  ).textContent = `The breed selected is ${event.target.value}`;
  selectedBreed = event.target.value;
  setImage();
}

function setImage() {
  let breedType = selectedBreed;
  document.getElementById("slide").src = allImages[breedType][0];
  left.disabled = true;
}

//Add Event listener when breed is chosen from dropdown

selectElement.addEventListener("change", handleBreedSelect);

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
