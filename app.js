function updateTemperature(response) {
  //update time on page
  let apiDate = new Date(response.data.time * 1000);
  updateTime(apiDate);

  //update temperature on page
  let cityTemperature = response.data.temperature.current;
  let mainTempElement = document.querySelector("#main-temp");
  mainTempElement.innerHTML = Math.round(cityTemperature);

  //update icon on page
  let iconElement = document.querySelector("#icon");
  let apiIconUrl = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${apiIconUrl}" alt="weather-icon">`;

  //update city on page
  let city = document.querySelector("#city");
  let apiCity = response.data.city;
  city.innerHTML = apiCity;

  //update feels-like temps on page
  let feelsLikeTemp = document.querySelector("#feels-like");
  let apiFeelsLikeTemp = response.data.temperature.feels_like;
  feelsLikeTemp.innerHTML = `${Math.round(apiFeelsLikeTemp)}°`;

  //update weather condition on page
  let weatherCondition = document.querySelector("#weather-condition");
  let apiWeather = response.data.condition.description;
  weatherCondition.innerHTML = apiWeather;

  //update humidity on page
  let humidity = document.querySelector("#humidity");
  let apiHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${apiHumidity}%`;

  //update wind speed on page
  let windSpeed = document.querySelector("#wind");
  let apiWindSpeed = response.data.wind.speed;
  windSpeed.innerHTML = `${Math.round(apiWindSpeed)} km/h`;

  //get weather forecast using city obtained
  getForecast(apiCity);
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

function updateTime(apiDate) {
  let now = apiDate;
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

function getForecast(city) {
  let apiKey = "ad4b43cf6af0980of893btef5c61f2c7";
  let query = city;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);
  let forecast = document.querySelector("#weather-forecast");

  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="row">
        <div class="col-2">
          <div class="forecast-date">${day}</div>
          <div class="forecast-icon">
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png
          "
              alt="weather-icon"
            />
          </div>
          <div class="forecast-temp">
            <span class="forecast-high-temp">21°</span
            ><span class="forecast-low-temp">/15°</span>
          </div>
        </div>
      </div>
    `;
  });

  forecast.innerHTML = forecastHtml;
}

searchCity("Paris");

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchEvent);
