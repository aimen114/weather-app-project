// Get the necessary elements
const cityName = document.getElementById("cityName");
const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");

// Toggle the visibility of the search input when the icon is clicked
searchIcon.addEventListener("click", () => {
  searchInput.style.display = "inline-block";
  searchInput.focus();
});

// Update the city name and hide the input when a city is searched
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    cityName.textContent = searchInput.value;
    searchInput.value = "";
    searchInput.style.display = "none";
  }
});
