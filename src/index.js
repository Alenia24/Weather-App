function updateWeather(response) {
    console.log(response);
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city; 
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