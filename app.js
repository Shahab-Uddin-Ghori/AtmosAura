// const for getting form submit and input field
const weatherForm = document.querySelector("#weatherForm"); // for form submition
const inputField = document.querySelector("#inputField"); // for input field

// these const are out const they are showing temp, humidity, feel like, windSpeed, country etc
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const feelLike = document.querySelector("#feelLike");
const pressure = document.querySelector("#pressure");
const ToDayWeather = document.querySelector("#weather");
const wind = document.querySelector("#wind");
const country = document.querySelector("#country");
const sunRiseSunSet = document.querySelector("#sunRiseSunSet");
const icon = document.querySelector("#icon");

// these const are for error output
const message = document.querySelector("#message");

// api key
const apiKEY = `98092c54b629e85a8a8adc138825a7b2`;

// async/ function for weather call when submit form
const weatherFunction = async (event) => {
  event.preventDefault(); // preventing for refreshing page
  const city = inputField.value; // getting city name as a Value

  // api url
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKEY}`;

  const dataFromApi = await fetch(apiUrl); // by fetching form api
  const collectingDataFromApi = await dataFromApi.json(); // convert data xml to json format

  // showing const as output
  temp.innerText = `Current Temp is ${Math.round(collectingDataFromApi.main.temp)} °C 🌡️ `;
  feelLike.innerText = `Feels Like is ${Math.round(collectingDataFromApi.main.feels_like)} °C 🌞`;
  humidity.innerText = `Humidity is ${collectingDataFromApi.main.humidity} g/kg 💦`;
  pressure.innerText = `Pressure is ${collectingDataFromApi.main.pressure} pa  💨`;
  country.innerText = `${collectingDataFromApi.name} ${collectingDataFromApi.sys.country} 🌍`;
  // setting and displaying sun rise and sun set into local time
  const sunriseTime = new Date(
    collectingDataFromApi.sys.sunrise * 1000
  ).toLocaleTimeString();
  const sunsetTime = new Date(
    collectingDataFromApi.sys.sunset * 1000
  ).toLocaleTimeString();
  sunRiseSunSet.innerHTML = `Sun Rise at ${sunriseTime } 🌅 <br> Sun Set at ${sunsetTime} 🌇`;
  icon.innerHTML = `<img src=https://openweathermap.org/img/wn/${collectingDataFromApi.weather[0].icon}.png >`;
  ToDayWeather.innerHTML = `${collectingDataFromApi.weather[0].description}`
  wind.innerText = `Wind Speed is ${collectingDataFromApi.wind.speed} m/s 🌪️`;

  // for checking data is reciving or not on console
  console.log(collectingDataFromApi);
};
weatherForm.addEventListener("submit", weatherFunction);
// document.querySelector("#message").innerText = city
