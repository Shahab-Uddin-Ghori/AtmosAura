// Selectors for form submission and input field
const weatherForm = document.querySelector("#weatherForm");
const inputField = document.querySelector("#inputField");
const submitButton = weatherForm.querySelector("button[type='submit']"); // Selector for the submit button

// Selectors for displaying weather information
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const feelLike = document.querySelector("#feelLike");
const pressure = document.querySelector("#pressure");
const ToDayWeather = document.querySelector("#weather");
const wind = document.querySelector("#wind");
const country = document.querySelector("#country");
const sunRiseSunSet = document.querySelector("#sunRiseSunSet");
const icon = document.querySelector("#icon");
const loading = document.querySelector("#loading");

// Selector for displaying error messages
const message = document.querySelector("#message");

// Group weather elements for easy clearing
let clear = { temp, humidity, feelLike, pressure, ToDayWeather, wind, country, sunRiseSunSet, icon };

// API key
const apiKEY = `98092c54b629e85a8a8adc138825a7b2`;

// Function to fetch and display weather data
const weatherFunction = async (event) => {
  event.preventDefault(); // Prevent page refresh on form submission

  // Disable the submit button to prevent multiple submissions
  submitButton.disabled = true;

  // Clear previous data and set loading message
  Object.values(clear).forEach(element => element.innerText = '');
  message.innerText = "";
  loading.innerHTML = `<img src="./img/loading.gif" style="vertical-align: middle;">`; // Add loading GIF
  loading.style.fontSize = '2rem'; // Set the font size using JavaScript

  try {
    const city = encodeURIComponent(inputField.value.trim()); // Get and URL-encode city name

    // Construct the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKEY}`;

    // Fetch data from the API
    const dataFromApi = await fetch(apiUrl);
    const collectingDataFromApi = await dataFromApi.json();

    // Check if the API returned an error
    if (collectingDataFromApi.cod !== 200) {
      throw new Error(collectingDataFromApi.message);
    }

    // Clear the loading message
    loading.innerText = "";

    // Update UI with the fetched data
    temp.innerText = `${Math.round(collectingDataFromApi.main.temp)} °C 🌡️`;
    feelLike.innerText = `Feels Like is ${Math.round(collectingDataFromApi.main.feels_like)} °C 🌞`;
    humidity.innerText = `Humidity is ${collectingDataFromApi.main.humidity} % 💦`;
    pressure.innerText = `Pressure is ${collectingDataFromApi.main.pressure} hPa 💨`;
    country.innerText = `${collectingDataFromApi.name}, ${collectingDataFromApi.sys.country} 🌍`;

    // Convert sunrise and sunset times to local time
    const sunriseTime = new Date(collectingDataFromApi.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(collectingDataFromApi.sys.sunset * 1000).toLocaleTimeString();
    sunRiseSunSet.innerHTML = `Sun Rise at ${sunriseTime} 🌅 <br> Sun Set at ${sunsetTime} 🌇`;

    // Display weather icon
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${collectingDataFromApi.weather[0].icon}.png" alt="weather icon">`;
    ToDayWeather.innerHTML = `${collectingDataFromApi.weather[0].description}`;
    wind.innerText = `Wind Speed is ${collectingDataFromApi.wind.speed} m/s 🌪️`;

    // Log data to console for debugging
    console.log(collectingDataFromApi);
  } catch (error) {
    // Display error message if data fetch fails
    loading.innerText = "";
    message.innerText = error.message || "Unable to fetch data. Please check the city name or try again later.";
    swal({
      title: "OOPS",
      text: "Unable to fetch data. Please check the city name or try again later.",
      icon: "error",
    });
  } finally {
    // Re-enable the submit button after the request is complete
    submitButton.disabled = false;
  }
};

// Add event listener for form submission
weatherForm.addEventListener("submit", weatherFunction);
