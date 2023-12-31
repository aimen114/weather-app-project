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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastdisplay = document.getElementById("forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 3) {
      forecastHTML += `<div class="weather-forecast-date">${formatDay(
        forecastDay.time
      )}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
      />
      <div class="weather-forecast-temp">
        <span class="highestTemp">${Math.round(
          forecastDay.temperature.maximum
        )}°</span> /
        <span class="lowestTemp">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>`;

      if (index < 2) {
        forecastHTML += "<hr />";
      }
      forecastHTML += "</div>";
    }
  });

  forecastdisplay.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "95aba4bfo096ef39t52469746eae7704";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherInfo(response) {
  let temp = document.getElementById("tempOfTheDay");
  let cityInput = document.getElementById("cityName");
  let humidity = document.getElementById("humidityNow");
  let wind = document.getElementById("windNow");
  let weatherDisc = document.getElementById("weatherCondition");
  let date = document.getElementById("date");
  let nowIcon = document.getElementById("nowIcon");

  temp.innerHTML = Math.round(response.data.temperature.current);
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

  getForecast(response.data.city);
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

function locateUser(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "95aba4bfo096ef39t52469746eae7704";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
}
function handleLocaterClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateUser);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

search("victoria");

let locate = document.getElementById("locater");
locate.addEventListener("click", handleLocaterClick);
