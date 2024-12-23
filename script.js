const API_KEY = '62557c13dbf50c04b21d05eedb2c0e59';
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeatherData(data);
        errorMessage.textContent = '';
        weatherInfo.classList.remove('hidden');
    } catch (error) {
        weatherInfo.classList.add('hidden');
        errorMessage.textContent = error.message;
    }
}

function displayWeatherData(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = 
        data.weather[0].description.charAt(0).toUpperCase() + 
        data.weather[0].description.slice(1);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = data.wind.speed;
    document.getElementById('weatherIcon').src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name';
        weatherInfo.classList.add('hidden');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            errorMessage.textContent = 'Please enter a city name';
            weatherInfo.classList.add('hidden');
        }
    }
});