const input = document.getElementById("input")
const container = document.querySelector(".cards")
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
let sortBtn = document.getElementById("sortBtn")

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

let baseURL = "https://restcountries.com/v3.1/all";
fetch(`${baseURL}`)
  .then((rep) => rep.json())
  .then((data) => {
    renderUI(data);
  }).catch(err => console.log(err))

function renderUI(array) {
  let innerText = ""
  for (let i = 0; i < array.length; i++) {
    innerText += `<div class="card" style="width: 18rem;" >
    <img src="${array[i].flags.png}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5><a class="btn btn-infon" href="index.html?id=${array[i].name.common}">${array[i].name.common}</a></h5>
      <p class="card-text"> <b>Population:</b> ${array[i].population}</p>
      <p class="card-text"><b>region:</b> ${array[i].region}</p>
      <p class="card-text"><b>capital:</b> ${array[i].capital}</p>
      
      
    </div>
  </div>`

  }
  container.innerHTML = innerText

}


input.addEventListener("keyup", (e) => {
  let searchValue = e.target.value;
  fetch(`${baseURL}`)
    .then((rep) => rep.json())
    .then((data) => {
      let search = data.filter((praduct) =>
        praduct.name.common.toLowerCase().trim().includes(searchValue.toLowerCase().trim())
      );

      renderUI(search);
    });
});


sortBtn.addEventListener("click", () => {
  let val = sortBtn.value

  fetch(`${baseURL}`).then(res => res.json()).then(data => {
    if (val == "All") {
      renderUI(data)
    } else {
      let filterR = data.filter((reg) => reg.region.toLowerCase() == val.toLowerCase()
      )
      renderUI(filterR)
    }
  })

})