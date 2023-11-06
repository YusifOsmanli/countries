let params = new URLSearchParams(document.location.search);
let Name = params.get("id");
let card = document.querySelector("#card");

fetch(`https://restcountries.com/v3.1/name/${Name}`)
  .then((response) => response.json())
  .then((data) => {
    const countryData = data[0]; // Get the first element from the response array
    console.log(countryData);
    card.innerHTML = `
        <div class="card mt-5" style="width:40%;">
        <img src="${countryData.flags.png}" class="card-img-top" >
        <div class="card-body">
        <h5 class="card-title"><a href="#">${countryData.name.official}</a></h5>
          <p class="card-text"> Population: ${countryData.population}</p>
          <p class="card-text">Region: ${countryData.region}</p>
          <p class="card-text">Capital: ${countryData.capital}</p>
        </div>
        `;
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });
