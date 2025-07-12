 const apiKey = "786b97a241809445acb00dd0c493a3e2"; // 🔑 Replace with your actual OpenWeatherMap API key

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation, showError);
  } else {
    document.getElementById("result").innerHTML = "Geolocation is not supported.";
  }
});

function getWeatherByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => {
      document.getElementById("result").innerHTML = `<p>Error fetching weather.</p>`;
    });
}

function showError(error) {
  document.getElementById("result").innerHTML = `<p>Location access denied.</p>`;
}

function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(() => {
      document.getElementById("result").innerHTML = `<p>City not found.</p>`;
    });
}

function displayWeather(data) {
  if (data.cod !== 200) {
    document.getElementById("result").innerHTML = `<p>${data.message}</p>`;
    return;
  }

  let html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${data.main.temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
  `;
  document.getElementById("result").innerHTML = html;
}
