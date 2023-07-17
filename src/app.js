let cityName = document.getElementById("cityName");

let searchIcon = document.getElementById("searchIcon");
let searchBar = document.getElementById("searchInput");
searchBar.style.display = "none";

function showSearchBar() {
  searchBar.style.display = "inline-block";
  searchBar.focus();
}
function updateCityName(event) {
  if (event.key === `Enter`) {
    cityName.textContent = searchInput.value;
    searchInput.value = "";
    searchBar.style.display = "none";
  }
}

searchIcon.addEventListener("click", showSearchBar);
searchBar.addEventListener("keyup", updateCityName);
