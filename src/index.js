function updateWeather(response) {
    console.log(response);
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
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    
    return `${hours}:${minutes}`
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
    let apiUrl =
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");