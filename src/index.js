function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".current-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Pretoria");
