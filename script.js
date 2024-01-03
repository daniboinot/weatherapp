const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "f952fb8cdb26af234d49f7c74a0c35d4";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not find the weather");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityName = document.createElement("h1");
  card.appendChild(cityName);
  const temperature = document.createElement("p");
  card.appendChild(temperature);
  const humid = document.createElement("p");
  card.appendChild(humid);
  const desc = document.createElement("p");
  card.appendChild(desc);
  const weatheremoji = document.createElement("p");
  card.appendChild(weatheremoji);

  cityName.textContent = city;
  temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humid.textContent = `💦Humidity: ${humidity}`;
  desc.textContent = description;
  weatheremoji.textContent = getWeatherEmoji(id);

  cityName.classList.add("cityName");
  temperature.classList.add("temperature");
  humid.classList.add("humid");
  desc.classList.add("desc");
  weatheremoji.classList.add("weatheremoji");
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
