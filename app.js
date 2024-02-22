

var obj = {};

var arr = [""];
var options ="";


fetch("https://dog.ceo/api/breeds/list/all")
 .then(res => res.json())
 .then((data) => 
   obj = data.message
 ).then((obj)=> {
 for(let key in obj){
  let breed = key.charAt(0).toUpperCase() + key.slice(1)
  arr.push(breed)
}
  arr.map((op, i) => {
    options = options + `<option value="${op}" id="${i}">${op}</options>`
  })

  document.getElementById('arrayDropdown').innerHTML=options

  
 });

const selectElement = document.querySelector("#arrayDropdown");
const result = document.querySelector("#test");
var selectedBreed = 0;

 function chosenBreed (event) {
  result.textContent = `The breed selected is ${event.target.value}`;
  selectedBreed = event.target.value;
  console.log(selectedBreed);

 }


 var breedImages = {};
 function fetchImages () {
  for(let i = 0; i < arr.length; i++){
    let breedType = arr[i];
    let url = `https://dog.ceo/api/breed/${breeType}/images`
    fetch(url).then(response => response.json()).then((data)=> data = data.message).then(()
    {

    } )
  }
}


 selectElement.addEventListener("change", chosenBreed)



 

 



