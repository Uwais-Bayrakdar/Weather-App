const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const cityWeatherList = document.querySelector(".city-weather-list");
const warningMsg = document.querySelector(".warning-msg");

const weatherConditionSymbols = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "💨",
  Haze: "🌁",
  Dust: "🌬️",
  Fog: "🌫️",
  Sand: "🏜️",
  Ash: "🌋",
  Squall: "🌪️",
  Tornado: "🌪️"
};

searchBtn.addEventListener("click", async () => {
    if (searchInput.value === "") {
        cityWeatherList.innerHTML = "";    
        return
    };
    const searchedCity = searchInput.value;
    const encodedCity = encodeURIComponent(searchedCity);

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=b1f861617bf14ba433777b223d464c36&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            warningMsg.style.display = "block";
            cityWeatherList.innerHTML = "";
            cityWeatherList.classList.add("hidden");
            return;
        }

        warningMsg.style.display = "none";
        cityWeatherList.classList.remove("hidden");
        const symbol = weatherConditionSymbols[data.weather[0].main] || "🌍";

        cityWeatherList.innerHTML = `
        <h2>📍${data.name}</h2>
        <p>${symbol} ${data.main.temp}°C — ${data.weather[0].description}</p>
        <p>Feels Like: ${data.main.feels_like}°C | ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s → ${data.wind.deg}°</p>`;
     } catch (error) {
        warningMsg.style.display = "block";
        cityWeatherList.innerHTML = "";
        cityWeatherList.classList.add("hidden");
    }
});