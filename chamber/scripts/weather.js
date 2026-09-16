const fetchWeather = async () => {
  let lat = -25.72;
  let lon = 28.38;
  let API_key = "291547be3b03e0f848a07cbbe427449e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;

  const forecast = document.querySelector("#forecast-container");

  const response = await fetch(url);
  const data = await response.json();

  forecast.textContent = data.weather[0].description;

  console.log(data.weather[0].description);
};

fetchWeather();
