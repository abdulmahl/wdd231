const fetchWeather = async () => {
  let lat = -25.72;
  let lon = 28.38;
  let units = "metric";
  let API_key = "291547be3b03e0f848a07cbbe427449e";

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=${units}`;

  const forecast_container = document.querySelector("#forecast-container");

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  weatherCard.innerHTML = `
    <div class="weather-header">
      <div>
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
      </div>

      <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="${data.weather[0].description}"
        loading="lazy"
        width="100"
        height="100"
      >
    </div>

    <div class="current-temperature">
      <span>${Math.round(data.main.temp)}</span>
      <span>°C</span>
    </div>

    <div class="weather-details">
      <div>
        <span>High</span>
        <strong>${Math.round(data.main.temp_max)}°C</strong>
      </div>

      <div>
        <span>Low</span>
        <strong>${Math.round(data.main.temp_min)}°C</strong>
      </div>

      <div>
        <span>Feels Like</span>
        <strong>${Math.round(data.main.feels_like)}°C</strong>
      </div>

      <div>
        <span>Humidity</span>
        <strong>${data.main.humidity}%</strong>
      </div>

      <div>
        <span>Wind</span>
        <strong>${Math.round(data.wind.speed)} m/s</strong>
      </div>
    </div>
  `;

  forecast_container.append(weatherCard);
};

fetchWeather();
