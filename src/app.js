let inputGroup = document.getElementById("input-group");
inputGroup.style.display = "none";

function toggleSearchBarVisibility() {
  if (inputGroup.style.display === "none") {
    inputGroup.style.display = "block";
  } else {
    inputGroup.style.display = "none";
  }
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} `;
}

function displayWeatherInfo(response) {
  console.log(response.data);
  let temp = document.getElementById("tempOfTheDay");
  let cityInput = document.getElementById("cityName");
  let humidity = document.getElementById("humidityNow");
  let wind = document.getElementById("windNow");
  let weatherDisc = document.getElementById("weatherCondition");
  let date = document.getElementById("date");
  let nowIcon = document.getElementById("nowIcon");

  celsiusTemp = response.data.temperature.current;

  temp.innerHTML = Math.round(celsiusTemp);
  cityInput.innerHTML = response.data.city;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherDisc.innerHTML = response.data.condition.description;
  date.innerHTML = formatDate(response.data.time * 1000);
  nowIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  nowIcon.setAttribute("alt", `${response.data.condition.description}`);
}

function search(city) {
  let apiKey = "95aba4bfo096ef39t52469746eae7704";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.getElementById("cityInput");
  search(searchInput.value);
  toggleSearchBarVisibility();
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temp = document.getElementById("tempOfTheDay");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.getElementById("tempOfTheDay");
  temp.innerHTML = Math.round(celsiusTemp);
}

function locateUser(position) {
  let lon = position.coordinates.longitude;
  let lat = position.coordinates.latitude;
  let apiKey = "95aba4bfo096ef39t52469746eae7704";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherInfo);
}
function handleLocaterClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateUser);
}

let celsiusTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.getElementById("f-c-btn");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.getElementById("c-f-btn");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Moscow");

let locate = document.getElementById("locater");
locate.addEventListener("click", handleLocaterClick);
