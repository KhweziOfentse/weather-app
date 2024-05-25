function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".current-city");
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let descriptionElement = document.querySelector(".current-description");
  let windElement = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  let dateElement = document.querySelector(".current-date");
  let currentDate = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = humidity + "%";
  windElement.innerHTML = windSpeed + "km/h";
  dateElement.innerHTML = formatDate(currentDate);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function searchCity(city) {
  let apiKey = "b3at1f54094o5ce1cac43e10abb70bf3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");

  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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
  return day + " " + hours + ":" + minutes;
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-date">
        <div class="forecast-day">${day}</div>
        <div class="forecast-icon">🌤️</div>
        <div class="forecast-temperatures">
          <div class="forecast-max">
            <strong>15º</strong>
          </div>
          <div class="forecast-min">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Pretoria");
displayForecast();
