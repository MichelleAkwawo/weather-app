// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = daysOfWeek[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
  minute = "0" + minute;
} else {
  minute;
}

if (hour < 10) {
  hour = "0" + hour;
} else {
  hour;
}

let sentence = `${day} ${hour}:${minute}`;

let todaysDate = document.querySelector(".todays-date");

todaysDate.innerHTML = `${sentence}`;

//...........FUNCTION THAT DISPLAYS WEATHER CONDITION..............

function displayWeatherConditions(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let citySearch = document.querySelector("#search-text-input");
citySearch.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  // console.log(position);
  // GET THE CURRENT LONGITUDE AND LATITUDE OF THE DEVICE IN USE
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let geoLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(geoLocationApiUrl);

  axios.get(geoLocationApiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  console.log(event);

  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentSearchDetails = document.querySelector("#current-location-button");
currentSearchDetails.addEventListener("click", getCurrentLocation);

searchCity("New York");
