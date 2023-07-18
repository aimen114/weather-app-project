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
  console.log(response);
  console.log(response.data.time);
  let temp = document.getElementById("tempOfTheDay");
  let cityInput = document.getElementById("cityName");
  let humidity = document.getElementById("humidityNow");
  let wind = document.getElementById("windNow");
  let weatherDisc = document.getElementById("weatherCondition");
  let date = document.getElementById("date");

  temp.innerHTML = Math.round(response.data.temperature.current);
  cityInput.innerHTML = response.data.city;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherDisc.innerHTML = response.data.condition.description;
  date.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "95aba4bfo096ef39t52469746eae7704";
let searchedCity = "Paris";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeatherInfo);
