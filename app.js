function updateTemperature(response) {
  //update temperature on page
  let cityTemperature = response.data.temperature.current;
  let mainTempElement = document.querySelector("#main-temp");
  mainTempElement.innerHTML = Math.round(cityTemperature);

  //update city on page
  let city = document.querySelector("#city");
  let apiCity = response.data.city;
  city.innerHTML = apiCity;
}

function searchCity(city) {
  let apiKey = `ad4b43cf6af0980of893btef5c61f2c7`;
  let query = city;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function handleSearchEvent(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function updateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = `${day} ${hour}:${minutes},`;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = date;
}

updateTime();

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchEvent);

searchCity("Paris");
