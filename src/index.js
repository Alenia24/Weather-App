function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime(date);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  let icon = updateIcon(response.data.condition.icon);
  console.log(response.data.condition.icon);
  iconElement.innerHTML = `${icon}`;

  getForecast(response.data.city);
}

function updateIcon(icon) {
  if (icon === "clear-sky-day") {
    return `<img src="./assets/clear-sky-day.svg">`;
  } else if (icon === "clear-sky-night") {
    return `<img src="./assets/clear-sky-night.svg">`;
  } else if (icon === "few-clouds-day") {
    return `<img src="./assets/few-clouds-day.svg">`;
  } else if (icon === "few-clouds-night") {
    return `<img src="./assets/few-clouds-night.svg">`;
  } else if (icon === "scattered-clouds-day") {
    return `<img src="./assets/scattered-clouds-day.svg">`;
  } else if (icon === "scattered-clouds-night") {
    return `<img src="./assets/scattered-clouds-night.svg">`;
  } else if (icon === "broken-clouds-day") {
    return `<img src="./assets/broken-clouds-day.svg">`;
  } else if (icon === "broken-clouds-night") {
    return `<img src="./assets/broken-clouds-night.svg">`;
  } else if (icon === "shower-rain-day") {
    return `<img src="./assets/shower-rain-day.svg">`;
  } else if (icon === "shower-rain-night") {
    return `<img src="./assets/shower-rain-night.svg">`;
  } else if (icon === "rain-day") {
    return `<img src="./assets/rain-day.svg">`;
  } else if (icon === "rain-night") {
    return `<img src="./assets/rain-night.svg">`;
  } else if (icon === "thunderstorm-day") {
    return `<img src="./assets/thunderstorm-day.svg">`;
  } else if (icon === "thunderstorm-night") {
    return `<img src="./assets/thunderstorm-night.svg">`;
  } else if (icon === "snow-day") {
    return `<img src="./assets/snow-day.svg">`;
  } else if (icon === "snow-night") {
    return `<img src="./assets/snow-night.svg">`;
  } else if (icon === "mist-day") {
    return `<img src="./assets/mist-day.svg">`;
  } else if (icon === "mist-night") {
    return `<img src="./assets/mist-night.svg">`;
  }
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDate(date) {
  let daysofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthsofYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = daysofWeek[date.getDay()];
  let currentDate = date.getDate();
  let month = monthsofYear[date.getMonth()];
  let year = date.getFullYear();

  return `${day}, ${currentDate} ${month}, ${year}`;
}

function searchCity(city) {
  let apiKey = "fb2da4606e22fot4bcd3216b032ab697";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
  searchInput.value = "";
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fb2da4606e22fot4bcd3216b032ab697";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let icon = updateIcon(day.condition.icon);
      forecastHTML += `
        <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div class="weather-forecast-icon">
                ${icon}
                </div>
                <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                    <strong>${Math.round(day.temperature.maximum)}° |</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}°</div>
            </div>
        </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
getForecast("New York");
