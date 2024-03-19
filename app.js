function handleSearchEvent(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
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
