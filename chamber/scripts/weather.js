const fetchWeather = async () => {
  let lat = -25.70;
  let lon = 28.38;
  let cnt = 3;
  let API_key = "291547be3b03e0f848a07cbbe427449e";
  let url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${API_key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fetchWeather();
